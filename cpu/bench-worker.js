/**
 * GearVerify Benchmark Worker
 * Performs intensive arithmetic cycles for 1:1 throughput counting.
 */

onmessage = function (e) {
    if (e.data.action === 'start') {
        const startTime = performance.now();
        let iterations = 0;
        let stop = false;

        // Run for the requested duration
        const duration = e.data.duration || 5000;

        while (performance.now() - startTime < duration) {
            // High-intensity arithmetic cycle (ALU + FP)
            // Matches the 'calculation' definition from industry standards
            for (let i = 0; i < 1000; i++) {
                let x = Math.random() * 1000;
                x = Math.sqrt(x) * Math.sin(x) + Math.cos(x) * Math.tan(x);
                x = Math.pow(x, 1.1) % 123.456;
                iterations++;
            }
        }

        const endTime = performance.now();
        const timeUs = (endTime - startTime) * 1000;
        const score = iterations / timeUs; // calculations / µs

        postMessage({
            action: 'result',
            score: score,
            iterations: iterations,
            timeMs: endTime - startTime
        });
    }
};
