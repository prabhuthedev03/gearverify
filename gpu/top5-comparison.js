// Top 5 GPU Rankings - PassMark G3D Mark (February 2026)
const TOP_5_GPUS = [
    { name: "RTX 5090", score: 40128, tier: "Flagship", useCase: "8K Gaming / AI Workloads" },
    { name: "RTX 4090", score: 35849, tier: "Enthusiast", useCase: "4K 240Hz / Content Creation" },
    { name: "RTX 5080", score: 34567, tier: "High-End", useCase: "4K 144Hz / VR" },
    { name: "RX 7900 XTX", score: 33284, tier: "High-End AMD", useCase: "4K Gaming / Productivity" },
    { name: "RTX 4080", score: 31618, tier: "High-End", useCase: "4K Gaming" }
];

/**
 * Display GPU benchmark score with Top 5 comparison
 * Called when user clicks "Start GPU Verification"
 */
function displayBenchmarkWithTop5(userGPU, userScore) {
    // Show the benchmark score in the display
    const scoreElement = document.getElementById('benchmark-score');
    const nameElement = document.getElementById('benchmark-name');

    if (scoreElement) {
        scoreElement.textContent = userScore.toLocaleString();
    }
    if (nameElement) {
        nameElement.textContent = "PassMark G3D Mark";
    }

    // Create Top 5 GPU comparison card (shown in "Auditing Graphics Architecture" button area)
    const comparisonHTML = `
        <div style="margin-top: 1.5rem; padding: 1.5rem; background: linear-gradient(135deg, rgba(0,122,255,0.05), rgba(88,86,214,0.05)); border-radius: 12px; border: 1px solid rgba(0,122,255,0.2);">
            <div style="font-size: 0.85rem; font-weight: 700; color: #007AFF; margin-bottom: 1rem; text-align: center;">
                📊 TOP 5 GPUs - PassMark G3D Mark (Industry Standard)
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${TOP_5_GPUS.map((gpu, index) => {
        const isCurrentGPU = gpu.name === userGPU;
        const percentageOfTop = ((userScore / gpu.score) * 100).toFixed(1);

        return `
                        <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: ${isCurrentGPU ? 'rgba(0,122,255,0.1)' : 'rgba(255,255,255,0.5)'}; border-radius: 8px; ${isCurrentGPU ? 'border: 2px solid #007AFF;' : ''}">
                            <div style="font-size: 1.25rem; font-weight: 800; min-width: 30px; color: ${isCurrentGPU ? '#007AFF' : '#666'};">
                                #${index + 1}
                            </div>
                            <div style="flex: 1;">
                                <div style="font-weight: 700; color: ${isCurrentGPU ? '#007AFF' : '#333'}; margin-bottom: 0.25rem;">
                                    ${gpu.name} ${isCurrentGPU ? '⭐ (Your GPU)' : ''}
                                </div>
                                <div style="font-size: 0.75rem; color: #666;">
                                    ${gpu.tier} • ${gpu.useCase}
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-weight: 800; font-size: 1.1rem; color: ${isCurrentGPU ? '#007AFF' : '#333'};">
                                    ${gpu.score.toLocaleString()}
                                </div>
                                <div style="font-size: 0.7rem; color: #999;">
                                    PassMark
                                </div>
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
            
            ${!TOP_5_GPUS.some(gpu => gpu.name === userGPU) ? `
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.7); border-radius: 8px; border-left: 3px solid #007AFF;">
                    <div style="font-weight: 700; color: #333; margin-bottom: 0.5rem;">
                        📌 Your ${userGPU}: ${userScore.toLocaleString()} PassMark
                    </div>
                    <div style="font-size: 0.75rem; color: #666; line-height: 1.4;">
                        Your GPU scores <strong>${((userScore / TOP_5_GPUS[0].score) * 100).toFixed(1)}%</strong> of the #1 ranked GPU (${TOP_5_GPUS[0].name}).
                        ${userScore > 15000 ? 'Still excellent for 1440p gaming!' : userScore > 10000 ? 'Great for 1080p gaming!' : 'Perfect for everyday tasks and light gaming.'}
                    </div>
                </div>
            ` : ''}
            
            <div style="margin-top: 1rem; text-align: center; font-size: 0.7rem; color: #999;">
                Source: PassMark Software - videocardbenchmark.net
            </div>
        </div>
    `;

    return comparisonHTML;
}

// Export for use in GPU Lab
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TOP_5_GPUS, displayBenchmarkWithTop5 };
}
