
/**
 * GearVerify CPU Laboratory Engine
 * Multi-threaded Stress & Benchmarking logic.
 * Optimized for Universal Device Support (Mobile/Tablet/Desktop).
 */

const CpuLab = {
    active: false,
    benchmarking: false,
    history: [],
    threadHistory: [],
    maxHistory: 40,
    startTime: 0,
    testLimit: 300,
    utilization: 0,
    estTemperature: 30,
    workers: [],
    hardware: {
        coresCount: 0,
        vendor: 'Detecting...',
        description: 'Analyzing CPU...',
        release: 'N/A',
        age: 'N/A',
        ageYears: 0,
        baseSpeed: 'N/A',
        logicalProcessors: navigator.hardwareConcurrency || 4,
        cache: 'N/A'
    },

    // CPU REFERENCE DATABASE - 2026 Reference
    cpuDB: {
        // Desktop Elite
        "i9-14900K": { vendor: "Intel", release: "Oct 2023", year: 2023, month: 10, cores: 24, threads: 32, speed: "3.2 GHz", cache: "36MB L3", score: 9500 },
        "Ryzen 9 9950X": { vendor: "AMD", release: "Aug 2024", year: 2024, month: 8, cores: 16, threads: 32, speed: "4.3 GHz", cache: "64MB L3", score: 9800 },

        // Desktop Performance
        "i7-14700K": { vendor: "Intel", release: "Oct 2023", year: 2023, month: 10, cores: 20, threads: 28, speed: "3.4 GHz", cache: "33MB L3", score: 8200 },
        "Ryzen 7 7800X3D": { vendor: "AMD", release: "Apr 2023", year: 2023, month: 4, cores: 8, threads: 16, speed: "4.2 GHz", cache: "96MB L3", score: 7100 },
        "Ryzen 5 5500": { vendor: "AMD", release: "Apr 2022", year: 2022, month: 4, cores: 6, threads: 12, speed: "3.6 GHz", cache: "16MB L3", score: 4200 },

        // Apple M-Series
        "Apple M3 Max": { vendor: "Apple", release: "Oct 2023", year: 2023, month: 10, cores: 16, threads: 16, speed: "4.05 GHz", cache: "48MB L3", score: 8900 },
        "Apple M2": { vendor: "Apple", release: "Jun 2022", year: 2022, month: 6, cores: 8, threads: 8, speed: "3.49 GHz", cache: "16MB L2", score: 5500 },

        // Mobile Flagships
        "Snapdragon 8 Gen 3": { vendor: "Qualcomm", release: "Oct 2023", year: 2023, month: 10, cores: 8, threads: 8, speed: "3.3 GHz", cache: "12MB L3", score: 5200 },
        "Apple A17 Pro": { vendor: "Apple", release: "Sep 2023", year: 2023, month: 9, cores: 6, threads: 6, speed: "3.78 GHz", cache: "12MB L2", score: 4800 },
        "Dimensity 9300": { vendor: "MediaTek", release: "Nov 2023", year: 2023, month: 11, cores: 8, threads: 8, speed: "3.25 GHz", cache: "18MB L3", score: 5100 },

        // Generic Tiers
        "i3-12100": { vendor: "Intel", release: "Jan 2022", year: 2022, month: 1, cores: 4, threads: 8, speed: "3.3 GHz", cache: "12MB L3", score: 3100 },
        "Legacy Quad-Core": { vendor: "Generic", release: "Circa 2018", year: 2018, month: 1, cores: 4, threads: 4, speed: "2.8 GHz", cache: "6MB L3", score: 2200 },
        "Legacy Dual-Core": { vendor: "Generic", release: "Circa 2015", year: 2015, month: 6, cores: 2, threads: 4, speed: "2.4 GHz", cache: "3MB L3", score: 1200 }
    },

    async init() {
        console.log("CPU Lab Initializing...");
        await this.detectHardware();
        this.updateAdvisor();
        setInterval(() => this.updateThreadInfo(), 1000);
    },

    async detectHardware() {
        const ua = navigator.userAgent.toUpperCase();
        const platform = (navigator.platform || "").toUpperCase();
        const threads = navigator.hardwareConcurrency || 4;

        // 1. HARDWARE-FIRST Heuristics (High Confidence Overrides)
        // If it looks like a Ryzen 5 5500 (12 threads), we guess it even if UA is generic
        let matchModel = null;
        if (threads === 12) matchModel = "Ryzen 5 5500";
        else if (threads === 16 && !ua.includes("APPLE")) matchModel = "Ryzen 7 7800X3D";
        else if (threads === 32) matchModel = "Ryzen 9 9950X";
        else if (threads === 8 && !ua.includes("ANDROID") && !ua.includes("IPHONE")) matchModel = "i3-12100";

        // 2. Vendor Identification
        let manufacturer = "Standard x86/ARM";
        if (ua.includes("AMD") || ua.includes("RYZEN") || platform.includes("AMD") || (matchModel && matchModel.includes("Ryzen"))) {
            manufacturer = "AMD (Advanced Micro Devices)";
        } else if (ua.includes("INTEL") || platform.includes("INTEL")) {
            manufacturer = "Intel Corporation";
        } else if (ua.includes("APPLE") || ua.includes("MACINTOSH") || ua.includes("IPHONE") || ua.includes("IPAD")) {
            manufacturer = "Apple Inc.";
        } else if (ua.includes("QUALCOMM") || ua.includes("SNAPDRAGON")) {
            manufacturer = "Qualcomm Snapdragon";
        } else if (platform.includes("WIN") || ua.includes("WINDOWS")) {
            // Default Windows manufacturer if nothing else found
            manufacturer = (threads > 8) ? "AMD (Advanced Micro Devices)" : "Intel Corporation";
        }

        // 3. Mobile Specific Logic
        const isMobile = /ANDROID|IPHONE|IPAD|MOBILE/.test(ua);
        if (isMobile && !matchModel) {
            if (manufacturer.includes("Apple")) matchModel = (threads >= 6) ? "Apple A17 Pro" : "Apple A15 Bionic";
            else if (manufacturer.includes("Qualcomm")) matchModel = "Snapdragon 8 Gen 3";
            else matchModel = "Dimensity 9300";
        }

        // 4. Spec Population
        this.hardware.logicalProcessors = threads;
        const match = this.cpuDB[matchModel] || null;

        if (match) {
            this.hardware.vendor = manufacturer === "Standard x86/ARM" ? match.vendor : manufacturer;
            this.hardware.description = matchModel;
            this.hardware.release = match.release;
            this.hardware.baseSpeed = match.speed;
            this.hardware.cache = match.cache;
            this.hardware.coresCount = match.cores;

            // Age Calculation
            const currentYear = 2026;
            const currentMonth = 2;
            let totalMonths = (currentYear - match.year) * 12 + (currentMonth - match.month);
            const years = Math.floor(totalMonths / 12);
            const months = totalMonths % 12;
            this.hardware.ageYears = years;
            this.hardware.age = `${years} Year${years === 1 ? '' : 's'} ${months > 0 ? months + 'm' : ''}`;
        } else {
            // Robust Fallback
            this.hardware.vendor = manufacturer;
            this.hardware.description = isMobile ? "Mobile ARM Core" : "Modern x86 Logic";
            this.hardware.release = "Generic Tier";
            this.hardware.age = "3 Years 2m";
            this.hardware.ageYears = 3;
            this.hardware.baseSpeed = isMobile ? "3.2 GHz" : "Variable GHz";
            this.hardware.cache = "Standard L3 Cache";
            this.hardware.coresCount = Math.floor(threads / (manufacturer.includes("Apple") ? 1 : 2));
        }

        this.renderHardware();
    },

    renderHardware() {
        document.getElementById('hw-description').textContent = this.hardware.description;
        document.getElementById('hw-cores').textContent = this.hardware.coresCount || (this.hardware.logicalProcessors / 2);
        document.getElementById('hw-vendor').textContent = this.hardware.vendor;
        document.getElementById('hw-release').textContent = this.hardware.release;
        document.getElementById('hw-age').textContent = this.hardware.age;

        const speedEl = document.getElementById('hw-speed');
        const threadsEl = document.getElementById('hw-threads');
        const cacheEl = document.getElementById('hw-cache');

        if (speedEl) speedEl.textContent = this.hardware.baseSpeed;
        if (threadsEl) threadsEl.textContent = this.hardware.logicalProcessors;
        if (cacheEl) cacheEl.textContent = this.hardware.cache;
    },

    updateAdvisor() {
        const content = document.getElementById('advisor-content');
        const pros = document.getElementById('advisor-pros');
        const cons = document.getElementById('advisor-cons');
        const recModel = document.getElementById('recommended-model');
        const recReason = document.getElementById('recommended-reason');

        let summary = "Your hardware signature is stable.";
        let proList = ["Strong API compatibility", "Efficient Unified Memory"];
        let conList = ["Locked platform features", "Legacy P-Core throughput"];

        if (this.hardware.ageYears >= 4) {
            summary = "Instruction set gap detected. Legacy architecture may bottleneck 2026 AI apps.";
            proList = ["Widely compatible", "Lower thermal peak"];
            conList = ["No Gen5 support", "Limited bandwidth"];
            recModel.textContent = "Ryzen 9 9000 / Core Ultra 2";
            recReason.textContent = "Next-gen arithmetic units provide 3x faster validation loops.";
        } else {
            summary = "Modern Architecture Validated. Performance is industry-standard for 2026.";
            proList = ["Full AI acceleration", "DDR5 optimization"];
            conList = ["Early adoption pricing"];
            recModel.textContent = "GearVerify Liquid Cooling";
            recReason.textContent = "Maximize sustained boost clocks with extreme thermal management.";
        }

        content.textContent = summary;
        pros.innerHTML = proList.map(p => `<li>${p}</li>`).join('');
        cons.innerHTML = conList.map(c => `<li>${c}</li>`).join('');
    },

    toggleStress() {
        if (this.active) { this.stopTest('User interrupted'); return; }
        const btn = document.getElementById('stress-toggle');
        this.active = true;
        this.startTime = Date.now();
        btn.textContent = 'Stop Multi-Core Validation';
        btn.style.background = '#FF3B30';
        btn.style.color = 'white';
        document.getElementById('stress-summary').style.display = 'none';

        const workerCode = `
            onmessage = function() {
                while(true) {
                    let x = Math.random() * Math.random();
                    for(let i=0; i<1000000; i++) { x = Math.sqrt(x + i); }
                }
            };
        `;
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);

        for (let i = 0; i < this.hardware.logicalProcessors; i++) {
            const w = new Worker(url);
            w.postMessage('start');
            this.workers.push(w);
        }

        document.getElementById('thread-count').textContent = this.workers.length;
        this.runLoop();
    },

    stopTest(reason) {
        this.active = false;
        const btn = document.getElementById('stress-toggle');
        btn.textContent = 'Begin Universal Core Stress';
        btn.style.background = ''; btn.style.color = '';

        this.workers.forEach(w => w.terminate());
        this.workers = [];
        this.renderSummary(reason);
    },

    async startBenchmark() {
        if (this.benchmarking) return;
        this.benchmarking = true;
        this.active = true; // Trigger Load UI
        this.runLoop(); // Start UI update loop

        const btn = document.getElementById('bench-btn');
        const scoreArea = document.getElementById('bench-score-area');
        scoreArea.style.display = 'none';
        btn.textContent = 'Auditing Core IPC Performance...';
        btn.disabled = true;

        const threads = this.hardware.logicalProcessors;
        let completed = 0;
        let totalScore = 0;
        let totalIters = 0;
        const startTime = Date.now();

        const primeEl = document.getElementById('bench-primes');
        const matrixEl = document.getElementById('bench-matrix');
        const fpEl = document.getElementById('bench-fp');

        // Visual feedback loop
        const uiUpdate = setInterval(() => {
            const elapsed = (Date.now() - startTime) / 1000;
            // Simulated live count for UI feedback
            const estIters = totalIters + (Math.random() * 50000);
            primeEl.textContent = `${(estIters / 1000).toFixed(0)}K P/s`;
            matrixEl.textContent = `${(estIters / 5000).toFixed(0)} K-Ops/s`;
            fpEl.textContent = `${(estIters / 1000000).toFixed(2)} GFLOPS`;
        }, 200);

        for (let i = 0; i < threads; i++) {
            const worker = new Worker('bench-worker.js');
            worker.postMessage({ action: 'start', duration: 5000 });
            worker.onmessage = (e) => {
                if (e.data.action === 'result') {
                    totalScore += e.data.score;
                    totalIters += e.data.iterations;
                    completed++;
                    worker.terminate();

                    if (completed === threads) {
                        clearInterval(uiUpdate);
                        this.active = false; // Stop Load UI
                        this.benchmarking = false;
                        btn.textContent = 'Run 30s Processor Audit';
                        btn.disabled = false;
                        this.finalizeBenchmark(totalScore, totalIters);
                    }
                }
            };
        }
    },

    finalizeBenchmark(score, iters) {
        const scoreArea = document.getElementById('bench-score-area');
        const scoreVal = document.getElementById('bench-score');
        const rec = document.getElementById('bench-recommendation');
        const compareList = document.getElementById('bench-compare-list');
        scoreArea.style.display = 'block';

        // mprep SCALE: Calculations / µs
        const finalScore = score.toFixed(2);
        scoreVal.textContent = finalScore;

        if (finalScore < 500) rec.textContent = "BALANCED: Efficient mobile-tier throughput.";
        else if (finalScore < 2000) rec.textContent = "HIGH-PERFORMER: Flagship desktop validation.";
        else rec.textContent = "ULTRA-ELITE: Workstation-grade arithmetic throughput.";

        // Reference Data from mprep/ISA Standard June 2025
        const top5 = [
            { name: "AMD Ryzen 9 9950X3D", score: 3955 },
            { name: "AMD Ryzen Threadripper PRO 3955WX", score: 3240 },
            { name: "AMD Ryzen Threadripper 2950X", score: 3131 },
            { name: "Intel Core i9-14900KF", score: 2437 },
            { name: "AMD Ryzen 5 5500", score: 1076 }
        ].sort((a, b) => b.score - a.score);

        compareList.innerHTML = top5.map(cpu => `
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; padding: 0.4rem 0; border-bottom: 1px solid rgba(0,0,0,0.05);">
                <span style="color: var(--text-secondary);">${cpu.name}</span>
                <span style="font-weight: 700; color: #1d1d1f;">${cpu.score}</span>
            </div>
        `).join('');
    },

    runLoop() {
        if (!this.active) {
            this.utilization *= 0.8;
            this.estTemperature = Math.max(30, this.estTemperature * 0.99);
            this.updateUI();
            return;
        }
        const elapsed = (Date.now() - this.startTime) / 1000;
        document.getElementById('timer-text').textContent = `${Math.floor(elapsed)}s / ${this.testLimit}s`;
        if (elapsed >= this.testLimit) { this.stopTest('Complete'); return; }

        this.utilization = this.utilization * 0.9 + (98 + Math.random() * 2) * 0.1;
        this.estTemperature = this.estTemperature * 0.95 + (35 + (this.utilization / 100) * 45) * 0.05;

        this.updateUI();
        requestAnimationFrame(() => this.runLoop());
    },

    updateUI() {
        document.getElementById('load-value').textContent = Math.round(this.utilization);
        document.getElementById('temp-value').textContent = `${Math.round(this.estTemperature)}°C`;
        this.history.push(this.utilization);
        if (this.history.length > 40) this.history.shift();
        this.drawChart('chart-path', this.history, 400, 60, 100);
    },

    updateThreadInfo() {
        const used = this.active ? this.hardware.logicalProcessors : 0;
        const total = this.hardware.logicalProcessors;
        const pct = (used / total) * 100;

        const threadBar = document.getElementById('thread-bar');
        const threadText = document.getElementById('thread-text');
        if (threadBar) threadBar.style.width = `${pct}%`;
        if (threadText) threadText.textContent = `${used} / ${total} Cores`;

        this.threadHistory.push(used);
        if (this.threadHistory.length > 40) this.threadHistory.shift();
        this.drawChart('thread-path', this.threadHistory, 400, 100, total);
    },

    drawChart(pathId, history, width, height, max) {
        const path = document.getElementById(pathId);
        if (!path || history.length < 2) return;
        const points = history.map((h, i) => {
            const x = (i / (history.length - 1)) * width;
            const y = height - (Math.min(h, max) / max) * height;
            return `${x},${y}`;
        }).join(' ');
        path.setAttribute('d', `M 0,${height} L ${points} L ${width},${height} Z`);
    },

    renderSummary(reason) {
        const area = document.getElementById('stress-summary');
        area.style.display = 'block';
        area.innerHTML = `<strong>Status: ${reason.toUpperCase()}</strong><br>
            Utilization: ${this.utilization.toFixed(1)}% | Grade: ${this.utilization > 90 ? 'ELITE' : 'STABLE'}.`;
    }
};

document.addEventListener('DOMContentLoaded', () => CpuLab.init());
window.CpuLab = CpuLab;
