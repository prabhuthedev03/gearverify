/**
 * GearVerify Benchmarks Engine
 * Core logic for hardware comparison and 3-tier status evaluation.
 */

const Benchmarks = {
    data: null,

    async init() {
        if (this.data) return;
        try {
            const response = await fetch('/data/benchmarks.json');
            this.data = await response.json();
        } catch (error) {
            console.error('Failed to load benchmarks data:', error);
        }
    },

    /**
     * Compare user score against baseline
     * @param {string} category - e.g., 'cpu', 'gpu'
     * @param {number} score - User's real-time result
     * @returns {Object} - { percentile, status, recommendation }
     */
    evaluate(category, score) {
        if (!this.data) return null;

        const curve = this.data.percentiles[category] || [];
        if (curve.length === 0) return { score, status: 'unknown' };

        // Calculate percentile (simple linear interpolation or rank)
        // For simplicity, we'll find the rank among the 5 points
        let rank = 0;
        for (let i = 0; i < curve.length; i++) {
            if (score >= curve[i]) {
                rank = (i + 1) * 20; // 20, 40, 60, 80, 100
            }
        }

        let status = 'red';
        if (rank >= 80) status = 'green';
        else if (rank >= 40) status = 'yellow';

        const recommendation = rank < 70
            ? this.data.recommendations.find(r => r.category === category)
            : null;

        return {
            score,
            percentile: rank,
            status,
            statusLabel: status.toUpperCase(),
            recommendation
        };
    },

    renderResult(containerId, evaluation) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const colorClass = `status-${evaluation.status}`;

        container.innerHTML = `
            <div class="widget fade-in" style="margin-top: 2rem; border-color: var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h3 class="${colorClass}">>>> ${evaluation.statusLabel}_ANALYSIS</h3>
                    <div class="trust-badge" style="font-size: 0.6rem;">GEAR_VERIFIED</div>
                </div>
                
                <div style="text-align: center; margin: 3rem 0;">
                    <p style="font-size: 3rem; font-weight: 900; color: var(--accent-color); text-shadow: 0 0 15px var(--accent-glow);">
                        ${evaluation.percentile}%
                    </p>
                    <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; color: var(--text-secondary);">
                        Performance_Percentile_Rank
                    </p>
                </div>

                <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.4;">
                    Hardware output sync completed. Current configuration is performing at ${evaluation.percentile}% efficiency relative to 2026_STANDARDS.
                </p>

                ${evaluation.recommendation ? `
                <div class="amazon-card fade-in">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <span style="font-size: 0.7rem; color: #ff9900; font-weight: 700;">Verified Upgrade Path</span>
                            <h4>${evaluation.recommendation.name}</h4>
                        </div>
                        <img src="https://m.media-amazon.com/images/G/01/AUIClients/AmazonUIBaseCSS-spinner-2x-3d969f688eac4ea6e88a03f448e894c25f778f65._V2_.gif" style="width: 20px; opacity: 0.3;" alt="Amazon">
                    </div>
                    <p style="font-size: 0.8rem; color: #565959;">Top-rated hardware for 2026 performance parity.</p>
                    <div class="price">$599.99</div>
                    <a href="${evaluation.recommendation.url}" class="buy-btn" target="_blank" rel="nofollow">View on Amazon</a>
                </div>
                ` : `
                <div class="trust-badge status-green" style="display: block; text-align: center; margin-top: 2rem; background: rgba(16, 185, 129, 0.1);">
                    SYSTEM_OPTIMAL: NO_UPGRADE_REQUIRED
                </div>
                `}
            </div>
        `;
    }
};

window.Benchmarks = Benchmarks;
