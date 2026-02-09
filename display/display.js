/**
 * GearVerify Display Laboratory Engine
 * Refined for Studio-White Aesthetic & Precision
 */

const DisplayLab = {
    rafId: null,
    frameCount: 0,
    startTime: 0,
    lastTime: 0,
    measuring: false,

    init() {
        console.log("Display Lab Initializing...");
        this.detectScreenProps();
        this.startHzMeasure(); // Auto-start measurement
    },

    detectScreenProps() {
        // 1. Resolution & Pixel Ratio
        const width = window.screen.width;
        const height = window.screen.height;
        const dpr = window.devicePixelRatio || 1;

        document.getElementById('disp-res').textContent = `${width} x ${height}`;
        document.getElementById('disp-dpr').textContent = `${dpr.toFixed(2)}x` + (dpr > 1 ? " (Retina/HiDPI)" : "");

        // 2. Color Depth
        const depth = window.screen.colorDepth;
        document.getElementById('disp-depth').textContent = `${depth}-bit`;

        // 3. Orientation
        const orient = (screen.orientation || {}).type || "Landscape";
        document.getElementById('disp-orientation').textContent = orient.replace('primary', '').replace('-', ' ').toUpperCase();

        // 4. Touch
        const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        document.getElementById('disp-touch').textContent = touch ? "Yes (Digitizer)" : "No";

        // 5. Gamut
        const p3 = window.matchMedia("(color-gamut: p3)").matches;
        document.getElementById('disp-gamut').textContent = p3 ? "P3 (Wide Color)" : "sRGB (Standard)";
    },

    startHzMeasure() {
        if (this.measuring) return;
        this.measuring = true;
        this.frameCount = 0;
        this.startTime = performance.now();
        this.lastTime = this.startTime;
        this.rafId = requestAnimationFrame((t) => this.hzLoop(t));

        const btn = document.getElementById('hz-btn');
        btn.textContent = "Calibrating Signal...";
        btn.disabled = true;
    },

    hzLoop(timestamp) {
        this.frameCount++;
        const elapsed = timestamp - this.startTime;

        if (elapsed >= 1000) {
            const fps = Math.round((this.frameCount * 1000) / elapsed);
            document.getElementById('hz-value').textContent = fps;

            // Visual feedback
            const btn = document.getElementById('hz-btn');
            btn.textContent = "Recalibrate Signal";
            btn.disabled = false;
            this.measuring = false;
            return;
        }

        this.rafId = requestAnimationFrame((t) => this.hzLoop(t));
    },

    toggleHzMeasure() {
        if (this.measuring) return;
        this.startHzMeasure();
    },

    enterFullscreen(color) {
        const overlay = document.getElementById('fullpath-overlay');
        overlay.style.display = 'flex';
        overlay.style.backgroundColor = color;

        // Hide text if it's meant to be a pure test, show briefly?
        // For now, keep "Tap to exit" visible but faint
        overlay.style.color = (color === 'white' || color === 'lime' || color === '#ffffff') ? 'black' : 'white';
        overlay.textContent = "Tap anywhere to exit purity mode";

        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(e => console.log(e));
        }
    },

    exitFullscreen() {
        const overlay = document.getElementById('fullpath-overlay');
        overlay.style.display = 'none';

        if (document.exitFullscreen && document.fullscreenElement) {
            document.exitFullscreen();
        }
    },

    setGradient(type) {
        const el = document.getElementById('gradient-test');
        if (type === 'bw') {
            el.style.background = 'linear-gradient(to right, black, white)';
        } else if (type === 'rgb') {
            el.style.background = 'linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => DisplayLab.init());
window.DisplayLab = DisplayLab;
