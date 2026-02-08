/**
 * Web Worker for CPU Stress Testing
 * Performs heavy mathematical operations to tax the CPU.
 */

self.onmessage = function (e) {
    const { duration } = e.data;
    const endTime = Date.now() + duration;
    let ops = 0;

    while (Date.now() < endTime) {
        // Heavy math
        Math.sqrt(Math.random() * Math.random());
        Math.sin(Math.random()) * Math.cos(Math.random());
        ops++;

        // Periodic progress reporting
        if (ops % 1000000 === 0) {
            self.postMessage({ type: 'progress', ops });
        }
    }

    self.postMessage({ type: 'complete', totalOps: ops });
};
