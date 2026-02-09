/**
 * GearVerify Audio Laboratory Engine
 * Refined for Studio-White Aesthetic & Precision
 */

const AudioLab = {
    ctx: null,
    osc: null,
    gain: null,
    micStream: null,
    analyser: null,
    animationId: null,

    init() {
        console.log("Audio Lab Initializing...");

        // Create context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        this.updateIdentity();
        this.ctx.onstatechange = () => this.updateIdentity();

        // Populate devices if permission already granted or just list outputs
        this.listDevices();

        // Listen for device changes
        navigator.mediaDevices.ondevicechange = () => this.listDevices();
    },

    async listDevices() {
        try {
            // Check if we already have permission for full labels
            // If not, we might get empty labels until user clicks "Request Mic"
            const devices = await navigator.mediaDevices.enumerateDevices();

            const speakerSelect = document.getElementById('speaker-select');
            const micSelect = document.getElementById('mic-select');

            // Save current selection
            const currentSpeaker = speakerSelect.value;
            const currentMic = micSelect.value;

            speakerSelect.innerHTML = '';
            micSelect.innerHTML = '';

            // Add Default Options
            const defSpk = document.createElement('option');
            defSpk.value = 'default';
            defSpk.text = 'Default Output (System)';
            speakerSelect.appendChild(defSpk);

            const defMic = document.createElement('option');
            defMic.value = 'default';
            defMic.text = 'Default Microphone';
            micSelect.appendChild(defMic);

            let hasSpeakers = false;

            devices.forEach(dev => {
                const opt = document.createElement('option');
                opt.value = dev.deviceId;
                // Fallback label if empty (common before permission)
                opt.text = dev.label || `${dev.kind} (${dev.deviceId.slice(0, 4)}...)`;

                if (dev.kind === 'audiooutput') {
                    speakerSelect.appendChild(opt);
                    hasSpeakers = true;
                } else if (dev.kind === 'audioinput') {
                    micSelect.appendChild(opt);
                }
            });

            // Restore selection if exists
            if (currentSpeaker && currentSpeaker !== 'default') speakerSelect.value = currentSpeaker;
            if (currentMic && currentMic !== 'default') micSelect.value = currentMic;

        } catch (e) {
            console.error("Error listing devices:", e);
        }
    },

    updateIdentity() {
        if (!this.ctx) return;
        document.getElementById('audio-rate').textContent = `${this.ctx.sampleRate} Hz`;
        document.getElementById('audio-channels').textContent = this.ctx.destination.channelCount;
        document.getElementById('audio-state').textContent = this.ctx.state;
        document.getElementById('audio-latency').textContent = `${(this.ctx.baseLatency * 1000).toFixed(2)} ms`;
    },

    async ensureContext() {
        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }
        this.updateIdentity();
    },

    async changeOutput(deviceId) {
        if (this.ctx.setSinkId) {
            try {
                await this.ctx.setSinkId(deviceId === 'default' ? '' : deviceId);
                console.log(`Audio output set to ${deviceId}`);
            } catch (err) {
                console.error("Failed to set audio output:", err);
            }
        } else {
            console.warn("Browser does not support AudioContext.setSinkId");
        }
    },

    playTone(channel) {
        this.ensureContext();
        this.stopOsc();

        this.osc = this.ctx.createOscillator();
        this.osc.type = 'sine';
        this.osc.frequency.value = 440;

        const panner = this.ctx.createStereoPanner();
        if (channel === 'left') panner.pan.value = -1;
        if (channel === 'right') panner.pan.value = 1;
        if (channel === 'center') panner.pan.value = 0;

        this.gain = this.ctx.createGain();
        this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        this.gain.gain.exponentialRampToValueAtTime(0.5, this.ctx.currentTime + 0.1);

        this.osc.connect(panner);
        panner.connect(this.gain);
        this.gain.connect(this.ctx.destination);

        this.osc.start();
        setTimeout(() => this.stopOsc(), 1500);
    },

    stopOsc() {
        if (this.osc) {
            try {
                this.gain.gain.cancelScheduledValues(this.ctx.currentTime);
                this.gain.gain.setValueAtTime(this.gain.gain.value, this.ctx.currentTime);
                this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
                this.osc.stop(this.ctx.currentTime + 0.05);
            } catch (e) { }
            this.osc = null;
        }

        const btn = document.getElementById('sweep-btn');
        btn.textContent = "Start Oscillator";
        btn.onclick = () => this.toggleSweep();
    },

    toggleSweep() {
        this.ensureContext();
        if (this.osc) {
            this.stopOsc();
            return;
        }

        const slider = document.getElementById('freq-slider');
        const freq = slider.value;

        this.osc = this.ctx.createOscillator();
        this.osc.type = 'sine';
        this.osc.frequency.value = freq;

        this.gain = this.ctx.createGain();
        this.gain.gain.value = 0.3;

        this.osc.connect(this.gain);
        this.gain.connect(this.ctx.destination);
        this.osc.start();

        const btn = document.getElementById('sweep-btn');
        btn.textContent = "Stop Oscillator";
        btn.onclick = () => this.stopOsc();
    },

    updateFreq(val) {
        document.getElementById('freq-val').textContent = `${val} Hz`;
        if (this.osc) {
            this.osc.frequency.value = val;
        }
    },

    async startMicTest() {
        const btn = document.getElementById('mic-btn');
        const recBtn = document.getElementById('record-btn');
        const micSelect = document.getElementById('mic-select');

        btn.textContent = "Connecting...";
        btn.disabled = true;

        try {
            this.ensureContext();

            if (this.micStream) {
                this.micStream.getTracks().forEach(t => t.stop());
            }

            const deviceId = micSelect.value;
            const constraints = {
                audio: (deviceId === 'default' || !deviceId) ? true : { deviceId: { exact: deviceId } },
                video: false
            };

            this.micStream = await navigator.mediaDevices.getUserMedia(constraints);

            // CRITICAL: Re-list devices now that we have permission to see labels
            await this.listDevices();

            // Restore selection if it was specific
            if (deviceId && deviceId !== 'default') {
                micSelect.value = deviceId;
            }

            const source = this.ctx.createMediaStreamSource(this.micStream);
            this.analyser = this.ctx.createAnalyser();
            this.analyser.fftSize = 2048;
            source.connect(this.analyser);

            btn.textContent = "Signal Active";
            btn.style.background = "#34C759"; // Green
            btn.style.color = "white";
            btn.disabled = true; // Stay active

            // Enable Record Button
            if (recBtn) {
                recBtn.disabled = false;
                recBtn.style.opacity = "1";
                recBtn.style.cursor = "pointer";
                recBtn.textContent = "Start 15s Audit";
            }

            this.visualize();

        } catch (err) {
            console.error(err);
            btn.textContent = "Access Denied";
            btn.style.background = "#FF3B30";
            btn.style.color = "white";
            btn.disabled = false;
            btn.onclick = () => this.startMicTest(); // Allow retry
            alert(`Microphone Access Error: ${err.message}. Please allow output/input permissions in your browser settings.`);
        }
    },

    mediaRecorder: null,
    audioChunks: [],
    timerInterval: null,

    recordClip() {
        if (!this.micStream) return;

        const recBtn = document.getElementById('record-btn');
        const playbackArea = document.getElementById('playback-area');
        const statusArea = document.getElementById('rec-status');
        const timerEl = document.getElementById('rec-timer');

        playbackArea.style.display = 'none';
        statusArea.style.display = 'flex';

        this.audioChunks = [];
        this.mediaRecorder = new MediaRecorder(this.micStream);

        this.mediaRecorder.ondataavailable = event => {
            this.audioChunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
            clearInterval(this.timerInterval);
            const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = document.getElementById('mic-player');
            audio.src = audioUrl;

            statusArea.style.display = 'none';
            playbackArea.style.display = 'block';

            recBtn.textContent = "Start 15s Audit";
            recBtn.disabled = false;
            recBtn.style.opacity = "1";
        };

        this.mediaRecorder.start();
        recBtn.textContent = "Recording...";
        recBtn.disabled = true;
        recBtn.style.opacity = "0.5";

        // Timer Logic
        let timeLeft = 15;
        timerEl.textContent = `00:${timeLeft}`;

        this.timerInterval = setInterval(() => {
            timeLeft--;
            const seg = timeLeft < 10 ? `0${timeLeft}` : timeLeft;
            timerEl.textContent = `00:${seg}`;

            if (timeLeft <= 0) {
                if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
                    this.mediaRecorder.stop();
                }
                clearInterval(this.timerInterval);
            }
        }, 1000);
    },

    visualize() {
        const canvas = document.getElementById('mic-visualizer');
        const canvasCtx = canvas.getContext('2d');
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // Resize handling
        canvas.width = canvas.clientWidth * window.devicePixelRatio;
        canvas.height = canvas.clientHeight * window.devicePixelRatio;
        canvasCtx.scale(window.devicePixelRatio, window.devicePixelRatio);

        const WIDTH = canvas.clientWidth;
        const HEIGHT = canvas.clientHeight;

        if (this.animationId) cancelAnimationFrame(this.animationId);

        const draw = () => {
            this.animationId = requestAnimationFrame(draw);
            this.analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = '#f5f5f7';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = '#0066cc';
            canvasCtx.beginPath();

            const sliceWidth = WIDTH * 1.0 / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = v * HEIGHT / 2;
                if (i === 0) canvasCtx.moveTo(x, y);
                else canvasCtx.lineTo(x, y);
                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        };

        draw();
    }
};

document.addEventListener('DOMContentLoaded', () => AudioLab.init());
window.AudioLab = AudioLab;
