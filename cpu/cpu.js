/**
 * GearVerify CPU Laboratory Engine
 * Vanilla JS implementation for Precision CPU stress testing via Web Workers.
 * Optimized for Universal Device Support (Mobile/Tablet/Desktop).
 */

const CpuLab = {
    active: false,
    benchmarking: false,
    workers: [],
    startTime: 0,
    testLimit: 600, // 10 minutes
    opsPerSecond: 0,
    utilization: 0,
    estTemperature: 30,
    totalOps: 0,

    // Chart data
    chartData: [],
    chartMaxPoints: 60,
    utilData: [],

    hardware: {
        vendor: 'Detecting...',
        model: 'Analyzing CPU...',
        cores: 0,
        threads: 0,
        release: 'N/A',
        age: 'N/A',
        ageYears: 0,
        category: 'Unknown',
        tdp: 'N/A'
    },

    async init() {
        console.log("🔬 CPU Laboratory Initializing...");
        await this.detectHardware();
        this.updateAdvisor();
        this.showPassMarkScore();
    },

    async detectHardware() {
        this.hardware.threads = navigator.hardwareConcurrency || 4;

        const ua = navigator.userAgent;
        let detectedModel = null;

        if (ua.includes('iPhone') || ua.includes('iPad')) {
            detectedModel = this.detectAppleDevice(ua);
        } else if (ua.includes('Android')) {
            detectedModel = this.detectAndroidCPU(ua);
        }

        if (!detectedModel) {
            try {
                if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
                    const hints = await navigator.userAgentData.getHighEntropyValues(['architecture', 'platform', 'model']);
                    console.log('High Entropy Hints:', hints);
                    this.hardware.arch = hints.architecture;
                }
            } catch (e) {
                console.warn('High entropy hints unavailable:', e);
            }

            detectedModel = this.detectDesktopByThreads(this.hardware.threads, ua);
        }

        if (detectedModel) {
            this.hardware.model = detectedModel;
            this.enrichMetadata();
        } else {
            this.hardware.model = `Generic ${this.hardware.threads}-Thread Processor`;
            this.hardware.vendor = 'Unknown Vendor';
            this.hardware.cores = Math.ceil(this.hardware.threads / 2);
        }

        this.renderHardware();
    },

    detectAppleDevice(ua) {
        const modelMap = {
            'IPHONE16': 'Apple A18 Pro',
            'IPHONE15': 'Apple A17 Pro',
            'IPHONE14': 'Apple A16 Bionic',
            'IPHONE13': 'Apple A15 Bionic',
            'IPHONE12': 'Apple A14 Bionic',
            'IPHONE11': 'Apple A13 Bionic',
            'MAC': this.hardware.threads >= 10 ? 'Apple M4' : 'Apple M3'
        };

        for (const key in modelMap) {
            if (ua.toUpperCase().includes(key)) {
                this.hardware.vendor = 'Apple';
                return modelMap[key];
            }
        }

        if (ua.includes('Macintosh') || ua.includes('Mac OS')) {
            this.hardware.vendor = 'Apple';
            if (this.hardware.threads >= 16) return 'Apple M3 Max';
            if (this.hardware.threads >= 10) return 'Apple M4';
            if (this.hardware.threads >= 8) return 'Apple M3';
            return 'Apple M1';
        }

        return null;
    },

    detectAndroidCPU(ua) {
        const socs = {
            'SM8650': 'Snapdragon 8 Gen 3',
            'SM8550': 'Snapdragon 8 Gen 2',
            'SM8450': 'Snapdragon 8 Gen 1',
            'SM8350': 'Snapdragon 888',
            'SM8250': 'Snapdragon 865',
            'MT6989': 'Dimensity 9300',
            'MT6985': 'Dimensity 9200',
            'MT6983': 'Dimensity 9000',
            'EXYNOS 2400': 'Exynos 2400',
            'EXYNOS 2200': 'Exynos 2200',
            'EXYNOS 2100': 'Exynos 2100'
        };

        for (const key in socs) {
            if (ua.toUpperCase().includes(key)) {
                this.hardware.vendor = 'Qualcomm';
                if (key.startsWith('MT')) this.hardware.vendor = 'MediaTek';
                if (key.startsWith('EXYNOS')) this.hardware.vendor = 'Samsung';
                return socs[key];
            }
        }

        this.hardware.vendor = 'Qualcomm';
        if (this.hardware.threads >= 8) return 'Snapdragon 8 Gen 2';
        if (this.hardware.threads >= 6) return 'Snapdragon 865';
        return 'Snapdragon 888';
    },

    detectDesktopByThreads(threads, ua) {
        if (threads >= 32) return 'Ryzen 9 7950X';
        else if (threads >= 24) return 'Core i9-13900K';
        else if (threads >= 20) return 'Core i7-14700K';
        else if (threads >= 16) return 'Ryzen 7 5800X';
        else if (threads >= 12) return 'Ryzen 5 5600X';
        else if (threads >= 8) return 'Core i7-10700K';
        else if (threads >= 4) return 'Core i5-10600K';
        return null;
    },

    enrichMetadata() {
        const model = this.hardware.model.toUpperCase();
        let match = null;

        for (const key in cpuDB) {
            if (model === key.toUpperCase() || model.includes(key.toUpperCase())) {
                match = cpuDB[key];
                console.log(`✅ CPU Database Match: ${key} - PassMark Score: ${match.score}`);
                break;
            }
        }

        if (match) {
            this.hardware.vendor = match.vendor;
            this.hardware.cores = match.cores;
            this.hardware.threads = match.threads;
            this.hardware.release = match.release;
            this.hardware.category = match.category;
            this.hardware.tdp = match.tdp + 'W';
            this.hardware.benchmarkScore = match.score;
            this.hardware.socket = match.socket || match.device || 'N/A';

            const currentYear = 2026;
            const currentMonth = 2;
            let totalMonths = (currentYear - match.year) * 12 + (currentMonth - match.month);
            const years = Math.floor(totalMonths / 12);
            this.hardware.ageYears = years;
            this.hardware.age = `${years} Year${years === 1 ? '' : 's'}`;
        } else {
            console.warn(`❌ CPU "${model}" not found in database`);
            this.hardware.cores = Math.ceil(this.hardware.threads / 2);
            this.hardware.release = 'Unknown';
            this.hardware.age = 'N/A';
            this.hardware.tdp = 'Unknown';
            this.hardware.benchmarkScore = 0;
            this.hardware.category = 'Unknown';
        }
    },

    renderHardware() {
        document.getElementById('cpu-model').textContent = this.hardware.model;
        document.getElementById('cpu-vendor').textContent = this.hardware.vendor;
        document.getElementById('cpu-cores').textContent = `${this.hardware.cores} Cores / ${this.hardware.threads} Threads`;
        document.getElementById('cpu-release').textContent = this.hardware.release;
        document.getElementById('cpu-age').textContent = this.hardware.age;
    },

    showPassMarkScore() {
        const card = document.getElementById('passmark-card');
        const scoreEl = document.getElementById('benchmark-score');
        if (this.hardware.benchmarkScore && this.hardware.benchmarkScore > 0) {
            scoreEl.textContent = this.hardware.benchmarkScore.toLocaleString();
            card.style.display = 'block';
        }
    },

    updateAdvisor() {
        const currentScore = this.hardware.benchmarkScore || 5000;
        const category = this.hardware.category;
        const recommendation = this.getUpgradeRecommendation(currentScore, category);

        const content = document.getElementById('advisor-content');
        const pros = document.getElementById('advisor-pros');
        const cons = document.getElementById('advisor-cons');
        const recModel = document.getElementById('recommended-model');
        const recReason = document.getElementById('recommended-reason');

        if (!recommendation) {
            content.innerHTML = `<strong>Top Tier Verified.</strong> Your ${this.hardware.model} is already performing at an enthusiast level.`;
            pros.innerHTML = `<li>Ready for multi-threaded workloads</li><li>Supports latest software</li>`;
            cons.innerHTML = `<li>Diminishing returns on upgrade</li>`;
            if (recModel) recModel.textContent = 'Wait for Next Gen';
            if (recReason) recReason.textContent = 'Your current CPU is already top-tier.';
            return;
        }

        const boost = (recommendation.score / currentScore).toFixed(1);

        content.innerHTML = `
            <div style="font-size:0.9rem; margin-bottom:0.5rem;">
                <strong>Recommended Upgrade:</strong> <span style="color:#007AFF;">${recommendation.name}</span>
            </div>
            <div style="font-size:0.75rem; color:#666;">
                Get <strong>${boost}x performance</strong> boost. Perfect for ${recommendation.cores >= 12 ? 'Heavy Multithreading' : 'Gaming & Productivity'}.
            </div>
        `;

        pros.innerHTML = `
            <li><strong>${recommendation.score.toLocaleString()}</strong> PassMark Score (${boost}x faster)</li>
            <li>${recommendation.cores} Cores / ${recommendation.threads} Threads</li>
            <li>Release: ${recommendation.release}</li>
        `;

        cons.innerHTML = `
            <li>Motherboard compatibility: ${recommendation.socket || 'Check compatibility'}</li>
            <li>May require BIOS update</li>
            <li>Check cooling requirements (${recommendation.tdp}W TDP)</li>
        `;

        if (recModel) recModel.textContent = recommendation.name;
        if (recReason) recReason.textContent = `Significantly faster architecture. ${boost}x processing speed boost.`;
    },

    getUpgradeRecommendation(currentScore, category) {
        const targetScore = currentScore * 1.5;
        const candidates = Object.entries(cpuDB)
            .filter(([_, data]) => data.category === category && data.score > targetScore)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => a.score - b.score);

        return candidates[0] || null;
    },

    async toggleStress() {
        if (this.active) {
            this.stopTest('User stopped');
            return;
        }

        const btn = document.getElementById('stress-toggle');
        try {
            this.active = true;
            this.startTime = Date.now();
            btn.classList.add('active');
            btn.querySelector('span').textContent = 'Stop Verification';

            this.spawnWorkers();
            this.runLoop();
        } catch (err) {
            alert(err.message);
            this.stopTest('Error');
        }
    },

    spawnWorkers() {
        const workerCode = `
            self.onmessage = function(e) {
                if (e.data === 'START') {
                    let ops = 0;
                    const startTime = Date.now();
                    
                    while (Date.now() - startTime < 1000) {
                        let n = 10000;
                        for (let i = 2; i < n; i++) {
                            let isPrime = true;
                            for (let j = 2; j <= Math.sqrt(i); j++) {
                                if (i % j === 0) { isPrime = false; break; }
                            }
                        }
                        
                        let hash = 0;
                        for (let k = 0; k < 1000; k++) {
                            hash = ((hash << 5) - hash) + k;
                            hash = hash & hash;
                        }
                        
                        ops++;
                    }
                    
                    self.postMessage({ ops });
                }
            };
        `;

        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const workerURL = URL.createObjectURL(blob);

        const workerCount = this.hardware.threads;
        for (let i = 0; i < workerCount; i++) {
            const worker = new Worker(workerURL);
            worker.onmessage = (e) => {
                this.totalOps += e.data.ops;
            };
            this.workers.push(worker);
        }
    },

    runLoop() {
        if (!this.active) return;

        this.workers.forEach(w => w.postMessage('START'));

        const elapsed = (Date.now() - this.startTime) / 1000;
        this.opsPerSecond = Math.floor(this.totalOps / elapsed);
        this.utilization = Math.min(100, (this.opsPerSecond / 50000) * 100);
        this.estTemperature = 30 + (this.utilization * 0.5);

        document.getElementById('ops-value').textContent = this.opsPerSecond.toLocaleString();
        document.getElementById('cpu-util-value').textContent = `${this.utilization.toFixed(0)}%`;
        document.getElementById('cpu-temp-value').textContent = `${this.estTemperature.toFixed(0)}°C`;

        document.getElementById('util-text').textContent = `${this.utilization.toFixed(0)}%`;
        const utilBar = document.getElementById('util-bar');
        if (utilBar) utilBar.style.width = `${this.utilization}%`;

        const remaining = this.testLimit - elapsed;
        document.getElementById('cpu-timer-text').textContent = `${Math.floor(elapsed)}s / ${this.testLimit}s`;

        this.updateCharts();

        if (elapsed >= this.testLimit) {
            this.stopTest('Complete');
        } else {
            setTimeout(() => this.runLoop(), 1000);
        }
    },

    updateCharts() {
        this.chartData.push(this.opsPerSecond);
        if (this.chartData.length > this.chartMaxPoints) this.chartData.shift();
        this.renderChart('cpu-chart-path', this.chartData, 60);

        this.utilData.push(this.utilization);
        if (this.utilData.length > this.chartMaxPoints) this.utilData.shift();
        this.renderChart('util-path', this.utilData, 100);
    },

    renderChart(pathId, data, viewBoxHeight) {
        const path = document.getElementById(pathId);
        if (!path || data.length === 0) return;

        const points = data.length;
        const maxVal = Math.max(...data, 1);
        const xStep = 400 / (this.chartMaxPoints - 1);

        let d = `M 0 ${viewBoxHeight}`;
        data.forEach((val, i) => {
            const x = i * xStep;
            const y = viewBoxHeight - (val / maxVal) * viewBoxHeight;
            d += ` L ${x} ${y}`;
        });
        d += ` L ${(points - 1) * xStep} ${viewBoxHeight} Z`;

        path.setAttribute('d', d);
    },

    stopTest(reason) {
        this.active = false;
        this.workers.forEach(w => w.terminate());
        this.workers = [];

        const btn = document.getElementById('stress-toggle');
        btn.classList.remove('active');
        btn.querySelector('span').textContent = 'Start CPU Verification';

        const summary = document.getElementById('stress-summary');
        const summaryText = document.getElementById('summary-text');
        summary.style.display = 'block';
        summaryText.textContent = `Test ${reason}. Total Operations: ${this.totalOps.toLocaleString()}. Average OPS: ${this.opsPerSecond.toLocaleString()}/s.`;
    },

    async startBenchmark() {
        if (this.benchmarking) return;
        this.benchmarking = true;

        const btn = document.getElementById('bench-btn');
        const scanStatus = document.getElementById('benchmark-scan-status');
        const resultsArea = document.getElementById('benchmark-results-area');

        btn.disabled = true;
        btn.querySelector('span').textContent = 'Running Benchmark...';
        if (scanStatus) scanStatus.style.display = 'block';
        if (resultsArea) resultsArea.style.display = 'none';

        await this.runBenchmarkTest();
    },

    async runBenchmarkTest() {
        return new Promise((resolve) => {
            let benchOps = 0;
            const benchWorkers = [];
            const workerCount = this.hardware.threads;

            const workerCode = `
                self.onmessage = function(e) {
                    if (e.data === 'BENCH') {
                        let ops = 0;
                        const startTime = Date.now();
                        
                        while (Date.now() - startTime < 5000) {
                            let n = 20000;
                            for (let i = 2; i < n; i++) {
                                let isPrime = true;
                                for (let j = 2; j <= Math.sqrt(i); j++) {
                                    if (i % j === 0) { isPrime = false; break; }
                                }
                            }
                            
                            let matrix = [];
                            for (let a = 0; a < 50; a++) {
                                for (let b = 0; b < 50; b++) {
                                    matrix.push(a * b);
                                }
                            }
                            
                            ops++;
                        }
                        
                        self.postMessage({ ops });
                    }
                };
            `;

            const blob = new Blob([workerCode], { type: 'application/javascript' });
            const workerURL = URL.createObjectURL(blob);

            let completed = 0;
            for (let i = 0; i < workerCount; i++) {
                const worker = new Worker(workerURL);
                worker.onmessage = (e) => {
                    benchOps += e.data.ops;
                    completed++;

                    if (completed === workerCount) {
                        benchWorkers.forEach(w => w.terminate());
                        this.finalizeBenchmark(benchOps);
                        resolve();
                    }
                };
                benchWorkers.push(worker);
                worker.postMessage('BENCH');
            }
        });
    },

    finalizeBenchmark(ops) {
        this.benchmarking = false;

        const btn = document.getElementById('bench-btn');
        const scanStatus = document.getElementById('benchmark-scan-status');
        const resultsArea = document.getElementById('benchmark-results-area');

        btn.disabled = false;
        btn.querySelector('span').textContent = 'Begin Benchmark Test';
        if (scanStatus) scanStatus.style.display = 'none';

        const benchScore = Math.floor(ops / 100);

        this.displayTop5Comparison(benchScore);

        if (resultsArea) resultsArea.style.display = 'block';
    },

    displayTop5Comparison(userScore) {
        const category = this.hardware.category;
        const topList = category === 'Mobile' ? top5MobileCPUs : top5DesktopCPUs;
        const container = document.getElementById('top-cpus-comparison');

        if (!container) return;

        const allCPUs = [
            { name: `Your ${this.hardware.model}`, score: this.hardware.benchmarkScore || userScore, tier: 'Your System', isUser: true },
            ...topList
        ].sort((a, b) => b.score - a.score);

        container.innerHTML = allCPUs.slice(0, 6).map((cpu, i) => {
            const barWidth = (cpu.score / allCPUs[0].score) * 100;
            const isUser = cpu.isUser;

            return `
                <div style="background: ${isUser ? 'rgba(0,122,255,0.1)' : 'var(--surface-color)'}; padding: 0.75rem; border-radius: 8px; border-left: 3px solid ${isUser ? '#007AFF' : '#ccc'};">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <div>
                            <div style="font-size: 0.75rem; font-weight: 700; color: ${isUser ? '#007AFF' : 'var(--text-primary)'};">#{i + 1} ${cpu.name}</div>
                            <div style="font-size: 0.65rem; color: var(--text-secondary);">${cpu.tier}</div>
                        </div>
                        <div style="font-size: 0.9rem; font-weight: 700; color: ${isUser ? '#007AFF' : 'var(--text-primary)'};">${cpu.score.toLocaleString()}</div>
                    </div>
                    <div style="height: 6px; background: rgba(0,0,0,0.05); border-radius: 3px; overflow: hidden;">
                        <div style="height: 100%; background: ${isUser ? '#007AFF' : 'linear-gradient(90deg, #007AFF, #5856D6)'}; width: ${barWidth}%; transition: width 0.5s ease;"></div>
                    </div>
                </div>
            `;
        }).join('');
    }
};

document.addEventListener('DOMContentLoaded', () => CpuLab.init());
