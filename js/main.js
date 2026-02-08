/**
 * GearVerify Tactical Command Center | Visual HUD v3.5.0
 * Logic for 75-Node High-Density Diagnostic Grid
 */

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Terminal Interface v3.5.0 // Protocol: AXO_VISUAL_GRID');

    initEnvironmentIntel();
    initMicroPulses();
    initHighDensityInteractions();
});

/**
 * Environment Intel: Kernel & Engine Core
 */
function initEnvironmentIntel() {
    const platform = navigator.platform.toLowerCase();
    const os = platform.includes('win') ? "WINDOWS_NT" :
        platform.includes('mac') ? "DARWIN_XNU" :
            platform.includes('linux') ? "LINUX_STABLE" : "UNKNOWN_KERNEL";

    let engine = "V8_ISOLATE";
    if (navigator.userAgent.includes('Firefox')) engine = "GECKO_QUANTUM";
    else if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) engine = "WEBKIT_NATIVE";

    console.log(`[CORE] OS: ${os} | Engine: ${engine} | Visual_HUD: READY`);
}

/**
 * Micro-Pulses: Randomized Technical Readiness
 */
function initMicroPulses() {
    const pulses = document.querySelectorAll('.micro-pulse');

    pulses.forEach((pulse, index) => {
        // Staggered timing for realistic hardware throughput simulation
        const delay = Math.random() * 5;
        const duration = 1.5 + Math.random() * 2;

        pulse.style.animationDelay = `${delay}s`;
        pulse.style.animationDuration = `${duration}s`;

        // Occasional "Validation Spark"
        setInterval(() => {
            if (Math.random() > 0.99) {
                pulse.style.background = 'var(--accent-cyan)';
                pulse.style.boxShadow = '0 0 15px var(--accent-cyan-glow)';
                setTimeout(() => {
                    pulse.style.background = 'var(--accent-green)';
                    pulse.style.boxShadow = '0 0 10px var(--accent-green-glow)';
                }, 1000);
            }
        }, 10000);
    });
}

/**
 * High-Density Interactions
 */
function initHighDensityInteractions() {
    const nodes = document.querySelectorAll('.micro-node');

    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            // Optional: Dynamic data logging on hover
            const label = node.querySelector('.micro-label').textContent;
            // console.log(`[H_PROBE] ${label} :: STREAM_ENGAGED`);
        });
    });
}
