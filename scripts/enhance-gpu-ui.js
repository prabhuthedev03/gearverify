/**
 * GPU Lab UI Enhancement Script
 * Adds:
 * 1. PassMark Benchmark Score display to Performance Benchmark section
 * 2. Animated, attention-grabbing button with gradient and pulse effect
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../gpu/index.html');
let content = fs.readFileSync(htmlPath, 'utf-8');

// ===== FIX 1: Add Benchmark Score Display =====
// Find the Performance Benchmark section and add score display
const benchmarkSectionPattern = /(<div class="card-header">[\s\S]*?PERFORMANCE BENCHMARK[\s\S]*?<\/div>[\s\S]*?<div class="card-content">)/i;

if (benchmarkSectionPattern.test(content)) {
    content = content.replace(
        benchmarkSectionPattern,
        `$1
                    <div style="margin-bottom: 1.5rem; text-align: center; padding: 1rem; background: linear-gradient(135deg, rgba(0,122,255,0.1), rgba(88,86,214,0.1)); border-radius: 12px; border: 1px solid rgba(0,122,255,0.3);">
                        <div style="font-size: 0.75rem; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">
                            <span id="benchmark-name">PassMark G3D Mark</span>
                        </div>
                        <div style="font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #007AFF, #5856D6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                            <span id="benchmark-score">---</span>
                        </div>
                        <div style="font-size: 0.7rem; color: #999; margin-top: 0.5rem;">
                            Industry Standard GPU Performance Score
                        </div>
                    </div>`
    );
    console.log('✅ Added PassMark Benchmark Score display');
}

// ===== FIX 2: Create Eye-Catching Animated Button =====
// Add CSS for animated button
const buttonStyles = `
    <style>
    /* Animated Attention-Grabbing Button */
    .gpu-stress-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 20px 48px;
        font-size: 1.1rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #FFFFFF;
        background: linear-gradient(135deg, #007AFF 0%, #5856D6 100%);
        border: none;
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 8px 32px rgba(0, 122, 255, 0.4),
                    0 0 0 0 rgba(0, 122, 255, 0.6);
        animation: pulseGlow 2s ease-in-out infinite;
        overflow: hidden;
    }

    .gpu-stress-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        transition: left 0.5s;
    }

    .gpu-stress-btn:hover::before {
        left: 100%;
    }

    .gpu-stress-btn:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 12px 48px rgba(0, 122, 255, 0.6),
                    0 0 0 8px rgba(0, 122, 255, 0.2);
    }

    .gpu-stress-btn:active {
        transform: translateY(0) scale(1.02);
    }

    /* Pulsing glow animation */
    @keyframes pulseGlow {
        0%, 100% {
            box-shadow: 0 8px 32px rgba(0, 122, 255, 0.4),
                        0 0 0 0 rgba(0, 122, 255, 0.6);
        }
        50% {
            box-shadow: 0 8px 32px rgba(0, 122, 255, 0.6),
                        0 0 0 12px rgba(0, 122, 255, 0);
        }
    }

    /* Icon animation */
    .gpu-stress-btn svg {
        animation: rotate 3s linear infinite;
    }

    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .gpu-stress-btn.active {
        background: linear-gradient(135deg, #FF3B30 0%, #FF9500 100%);
        animation: none;
    }

    .gpu-stress-btn.active:hover {
        box-shadow: 0 12px 48px rgba(255, 59, 48, 0.6),
                    0 0 0 8px rgba(255, 59, 48, 0.2);
    }
    </style>
`;

// Inject button styles before </head>
if (!content.includes('gpu-stress-btn')) {
    content = content.replace('</head>', `${buttonStyles}</head>`);
    console.log('✅ Added animated button styles');
}

// Replace button HTML pattern
const buttonPattern = /(<button[^>]*id="stress-toggle"[^>]*>)[^<]+(Begin[^<]+Stress[^<]+)(<\/button>)/i;
if (buttonPattern.test(content)) {
    content = content.replace(
        buttonPattern,
        `<button class="gpu-stress-btn" id="stress-toggle">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 6v6l4 2"></path>
                        </svg>
                        <span>Start GPU Verification</span>
                    </button>`
    );
    console.log('✅ Enhanced button with animation and icon');
}

// Write updated content
fs.writeFileSync(htmlPath, content, 'utf-8');
console.log('\n🎉 GPU Lab UI Enhancement Complete!');
console.log('   • PassMark Benchmark Score display added');
console.log('   • Animated gradient button with pulse effect');
console.log('   • Eye-catching visual design for better UX');
