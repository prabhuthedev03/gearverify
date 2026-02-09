document.addEventListener('DOMContentLoaded', () => {
    initWebCamLab();
});

let mediaStream = null;
let videoElement = document.getElementById('webcam-video');
let canvasElement = document.createElement('canvas'); // Hidden canvas for processing
let ctx = canvasElement.getContext('2d');
let rafId = null;
let frameCount = 0;
let lastTime = performance.now();
let audioContext = null;
let analyser = null;
let dataArray = null;

const startBtn = document.getElementById('start-camera-btn');
const snapshotBtn = document.getElementById('snapshot-btn');
const cameraSelect = document.getElementById('camera-select');
const resVal = document.getElementById('res-val');
const fpsVal = document.getElementById('fps-val');
const formatVal = document.getElementById('format-val');
const micStatus = document.getElementById('mic-status');

// Specs Elements
const specsTableBody = document.getElementById('specs-body');

function initWebCamLab() {
    startBtn.addEventListener('click', () => startCamera());
    snapshotBtn.addEventListener('click', takeSnapshot);
    cameraSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            stopCamera();
            startCamera(e.target.value);
        }
    });

    // Initial check - if we already have permission from a previous session (unlikely in fresh load but possible)
    // navigator.permissions.query({ name: 'camera' }).then... (optional enhancement)
}

async function enumerateDevices() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');

        // Save current selection
        const currentSelection = cameraSelect.value;
        const currentSelectionStillExists = videoDevices.some(d => d.deviceId === currentSelection);

        cameraSelect.innerHTML = '';
        if (videoDevices.length === 0) {
            const option = document.createElement('option');
            option.text = "No cameras found";
            cameraSelect.add(option);
            return;
        }

        videoDevices.forEach(device => {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `Camera ${cameraSelect.length + 1}`;
            cameraSelect.appendChild(option);
        });

        // Restore selection if valid, otherwise select first
        if (currentSelectionStillExists) {
            cameraSelect.value = currentSelection;
        } else if (videoDevices.length > 0) {
            cameraSelect.value = videoDevices[0].deviceId;
        }

    } catch (err) {
        console.error("Error enumerating devices:", err);
    }
}

async function startCamera(deviceId = null) {
    const constraints = {
        video: deviceId ? { deviceId: { exact: deviceId } } : true,
        audio: true
    };

    try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        videoElement.srcObject = mediaStream;

        // Hide overlay
        document.getElementById('video-overlay').style.display = 'none';
        snapshotBtn.disabled = false;

        // Audio Setup
        setupAudio(mediaStream);

        // Re-enumerate to get labels now that we have permission
        await enumerateDevices();

        // If we started without a specific ID (first run), sync dropdown
        const track = mediaStream.getVideoTracks()[0];
        const settings = track.getSettings();
        if (!deviceId && settings.deviceId) {
            cameraSelect.value = settings.deviceId;
        }

        // Populate Detailed Specs
        populateSpecsTable(track);

        // Start Analysis Loop
        videoElement.onloadedmetadata = () => {
            updateStats();
            requestAnimationFrame(loop);
        };

    } catch (err) {
        console.error("Error accessing webcam:", err);
        document.querySelector('#video-overlay p').textContent = "Access Denied / Not Found";
        document.querySelector('#video-overlay p').style.color = "#ff3b30";
    }
}

function stopCamera() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
    }
    if (rafId) cancelAnimationFrame(rafId);
    if (audioContext) audioContext.close();
}

function populateSpecsTable(track) {
    const settings = track.getSettings();
    const capabilities = track.getCapabilities ? track.getCapabilities() : {};

    // Calculate Megapixels
    const width = settings.width || videoElement.videoWidth;
    const height = settings.height || videoElement.videoHeight;
    const mp = (width * height / 1000000).toFixed(2);

    // Determine Aspect Ratio
    const gcd = (a, b) => b == 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    const aspectRatio = `${width / divisor}:${height / divisor}`;

    const specs = [
        { label: "Detected Name", value: track.label || "Generic USB Video Device" },
        { label: "Active Resolution", value: `${width} x ${height} (Current Stream)` },
        { label: "Megapixels", value: `${mp} MP` },
        { label: "Aspect Ratio", value: aspectRatio },
        { label: "Frame Rate", value: `${Math.round(settings.frameRate || 0)} FPS (Target)` },
        { label: "Input ID", value: `<span style='font-size:0.75em; font-family:monospace'>${settings.deviceId ? settings.deviceId.substring(0, 16) + '...' : 'N/A'}</span>` },
        { label: "Focus Mode", value: settings.focusMode || (capabilities.focusMode ? capabilities.focusMode.join(', ') : "Fixed") },
        { label: "Zoom Capability", value: capabilities.zoom ? `Yes (Range: ${capabilities.zoom.min}-${capabilities.zoom.max})` : "No" },
        { label: "Torch / Flash", value: capabilities.torch ? "Supported" : "Not Supported" },
    ];

    const tbody = document.getElementById('specs-body');
    if (tbody) {
        tbody.innerHTML = '';
        specs.forEach(spec => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding: 12px; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 0.85rem;">${spec.label}</td>
                <td style="padding: 12px; border-bottom: 1px solid var(--border-color); color: var(--text-primary); font-weight: 600; font-size: 0.85rem;">${spec.value}</td>
            `;
            tbody.appendChild(row);
        });
    }
}

function updateStats() {
    if (!videoElement.videoWidth) return;

    // Resolution
    const width = videoElement.videoWidth;
    const height = videoElement.videoHeight;
    resVal.textContent = `${width} x ${height}`;

    // Format
    formatVal.textContent = "RGB/YUV";
}

function loop(now) {
    // FPS Calculation
    frameCount++;
    const delta = now - lastTime;

    if (delta >= 1000) {
        const fps = Math.round((frameCount * 1000) / delta);
        fpsVal.textContent = `${fps} FPS`;
        frameCount = 0;
        lastTime = now;
    }

    // Audio Visualizer
    if (analyser) {
        drawAudio();
    }

    rafId = requestAnimationFrame(loop);
}

function setupAudio(stream) {
    try {
        if (audioContext && audioContext.state !== 'closed') {
            audioContext.close();
        }
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        micStatus.textContent = "Active - Monitoring Input";
        micStatus.style.color = "var(--accent-blue)";
    } catch (e) {
        console.error("Audio setup failed", e);
        micStatus.textContent = "Audio Error / Muted";
    }
}

function drawAudio() {
    const canvas = document.getElementById('mic-visualizer');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim(); // Clear with bg
    ctx.clearRect(0, 0, width, height);

    // Better visualizer style
    const barWidth = (width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i] / 2;

        // Gradient fill
        const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
        gradient.addColorStop(0, '#34C759');
        gradient.addColorStop(1, '#30D158');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}

function takeSnapshot() {
    if (!videoElement.videoWidth) return;

    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;

    // Mirror if needed (Video is mirrored in CSS, so mirror canvas to match user expectation)
    ctx.translate(canvasElement.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoElement, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const dataUrl = canvasElement.toDataURL('image/png');
    const img = document.getElementById('snapshot-img');
    img.src = dataUrl;

    const link = document.getElementById('download-link');
    link.href = dataUrl;

    document.getElementById('snapshot-result').style.display = 'block';

    // Scroll to result
    document.getElementById('snapshot-result').scrollIntoView({ behavior: 'smooth' });
}
