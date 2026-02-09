/**
 * GearVerify Input Laboratory
 * High-Precision Mouse & Full Keyboard Analysis
 * V2: Full Layout + Auto-Localization
 */

const InputLab = {
    // Mouse Polling Variables
    lastMouseTime: 0,
    mouseIntervals: [],
    pollRateDisplay: null,

    // Keyboard State
    activeKeys: new Set(),

    init() {
        console.log("Input Lab Initializing...");

        this.pollRateDisplay = document.getElementById('hz-display');

        // Mouse Listeners
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        document.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });

        // Keyboard Listeners
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        this.renderFullKeyboard();

        // Start Polling Rate updater
        setInterval(() => this.updatePollingRateUI(), 250);
    },

    /* --- Mouse Logic --- */
    handleMouseMove(e) {
        const now = performance.now();
        if (this.lastMouseTime > 0) {
            const diff = now - this.lastMouseTime;
            if (diff > 0) {
                this.mouseIntervals.push(diff);
                if (this.mouseIntervals.length > 50) this.mouseIntervals.shift();
            }
        }
        this.lastMouseTime = now;
    },

    updatePollingRateUI() {
        if (performance.now() - this.lastMouseTime > 200) {
            this.pollRateDisplay.textContent = "0";
            this.pollRateDisplay.style.color = "var(--text-primary)";
            return;
        }

        if (this.mouseIntervals.length < 5) return;

        const sum = this.mouseIntervals.reduce((a, b) => a + b, 0);
        const avg = sum / this.mouseIntervals.length;
        const hz = Math.round(1000 / avg);

        this.pollRateDisplay.textContent = hz;

        if (hz > 900) this.pollRateDisplay.style.color = "#34C759";
        else if (hz > 450) this.pollRateDisplay.style.color = "#007AFF";
        else this.pollRateDisplay.style.color = "var(--text-primary)";
    },

    handleMouseDown(e) {
        const btnId = `btn-${e.button}`;
        const el = document.getElementById(btnId);
        if (el) el.classList.add('active');
        document.getElementById('last-btn').textContent = `Button ${e.button}`;
    },

    handleMouseUp(e) {
        const btnId = `btn-${e.button}`;
        const el = document.getElementById(btnId);
        if (el) el.classList.remove('active');
    },

    handleWheel(e) {
        e.preventDefault();
        document.getElementById('scroll-val').textContent = e.deltaY > 0 ? "Down" : "Up";
        const wheel = document.getElementById('btn-1');
        wheel.classList.add('active');
        setTimeout(() => wheel.classList.remove('active'), 150);
    },

    /* --- Full Keyboard Rendering --- */
    renderFullKeyboard() {
        const container = document.getElementById('kb-viz');
        container.innerHTML = '';
        container.className = 'keyboard-wrapper'; // New wrapper style

        // 1. Main Block (Alphanumeric)
        const mainSection = document.createElement('div');
        mainSection.className = 'kb-section';
        this.renderRow(mainSection, [
            { code: 'Escape', label: 'Esc' }, { spacer: true }, { code: 'F1' }, { code: 'F2' }, { code: 'F3' }, { code: 'F4' }, { spacer: 'half' }, { code: 'F5' }, { code: 'F6' }, { code: 'F7' }, { code: 'F8' }, { spacer: 'half' }, { code: 'F9' }, { code: 'F10' }, { code: 'F11' }, { code: 'F12' }
        ]);
        this.renderRow(mainSection, [
            { code: 'Backquote', label: '`' }, { code: 'Digit1', label: '1' }, { code: 'Digit2', label: '2' }, { code: 'Digit3', label: '3' }, { code: 'Digit4', label: '4' }, { code: 'Digit5', label: '5' }, { code: 'Digit6', label: '6' }, { code: 'Digit7', label: '7' }, { code: 'Digit8', label: '8' }, { code: 'Digit9', label: '9' }, { code: 'Digit0', label: '0' }, { code: 'Minus', label: '-' }, { code: 'Equal', label: '=' }, { code: 'Backspace', label: 'Back', cls: 'w-200' }
        ]);
        this.renderRow(mainSection, [
            { code: 'Tab', label: 'Tab', cls: 'w-150' }, { code: 'KeyQ', label: 'Q' }, { code: 'KeyW', label: 'W' }, { code: 'KeyE', label: 'E' }, { code: 'KeyR', label: 'R' }, { code: 'KeyT', label: 'T' }, { code: 'KeyY', label: 'Y' }, { code: 'KeyU', label: 'U' }, { code: 'KeyI', label: 'I' }, { code: 'KeyO', label: 'O' }, { code: 'KeyP', label: 'P' }, { code: 'BracketLeft', label: '[' }, { code: 'BracketRight', label: ']' }, { code: 'Backslash', label: '\\', cls: 'w-150' }
        ]);
        this.renderRow(mainSection, [
            { code: 'CapsLock', label: 'Caps', cls: 'w-175' }, { code: 'KeyA', label: 'A' }, { code: 'KeyS', label: 'S' }, { code: 'KeyD', label: 'D' }, { code: 'KeyF', label: 'F' }, { code: 'KeyG', label: 'G' }, { code: 'KeyH', label: 'H' }, { code: 'KeyJ', label: 'J' }, { code: 'KeyK', label: 'K' }, { code: 'KeyL', label: 'L' }, { code: 'Semicolon', label: ';' }, { code: 'Quote', label: "'" }, { code: 'Enter', label: 'Enter', cls: 'w-225' }
        ]);
        this.renderRow(mainSection, [
            { code: 'ShiftLeft', label: 'Shift', cls: 'w-225' }, { code: 'KeyZ', label: 'Z' }, { code: 'KeyX', label: 'X' }, { code: 'KeyC', label: 'C' }, { code: 'KeyV', label: 'V' }, { code: 'KeyB', label: 'B' }, { code: 'KeyN', label: 'N' }, { code: 'KeyM', label: 'M' }, { code: 'Comma', label: ',' }, { code: 'Period', label: '.' }, { code: 'Slash', label: '/' }, { code: 'ShiftRight', label: 'Shift', cls: 'w-275' }
        ]);
        this.renderRow(mainSection, [
            { code: 'ControlLeft', label: 'Ctrl', cls: 'w-125' }, { code: 'MetaLeft', label: 'Win', cls: 'w-125' }, { code: 'AltLeft', label: 'Alt', cls: 'w-125' }, { code: 'Space', label: '', cls: 'w-625' }, { code: 'AltRight', label: 'Alt', cls: 'w-125' }, { code: 'MetaRight', label: 'Fn', cls: 'w-125' }, { code: 'ContextMenu', label: 'Menu', cls: 'w-125' }, { code: 'ControlRight', label: 'Ctrl', cls: 'w-125' }
        ]);
        container.appendChild(mainSection);

        // 2. Navigation Block
        const navSection = document.createElement('div');
        navSection.className = 'kb-section';
        this.renderRow(navSection, [
            { code: 'PrintScreen', label: 'Prt' }, { code: 'ScrollLock', label: 'Scr' }, { code: 'Pause', label: 'Pse' }
        ]);
        this.renderRow(navSection, [
            { code: 'Insert', label: 'Ins' }, { code: 'Home', label: 'Hom' }, { code: 'PageUp', label: 'PgU' }
        ]);
        this.renderRow(navSection, [
            { code: 'Delete', label: 'Del' }, { code: 'End', label: 'End' }, { code: 'PageDown', label: 'PgD' }
        ]);
        // Blank row to push arrows down
        const blankRow = document.createElement('div');
        blankRow.className = 'kb-row';
        blankRow.style.height = '30px';
        navSection.appendChild(blankRow);

        this.renderRow(navSection, [
            { spacer: true }, { code: 'ArrowUp', label: '↑' }, { spacer: true }
        ]);
        this.renderRow(navSection, [
            { code: 'ArrowLeft', label: '←' }, { code: 'ArrowDown', label: '↓' }, { code: 'ArrowRight', label: '→' }
        ]);
        container.appendChild(navSection);

        // 3. Numpad Block
        const numSection = document.createElement('div');
        numSection.className = 'kb-section';
        // Numpad needs a bit creative row layout to handle vertical keys
        // For simplicity in flex, we do standard Grid logic or just rows
        this.renderRow(numSection, [
            { code: 'NumLock', label: 'Num' }, { code: 'NumpadDivide', label: '/' }, { code: 'NumpadMultiply', label: '*' }, { code: 'NumpadSubtract', label: '-' }
        ]);
        this.renderRow(numSection, [
            { code: 'Numpad7', label: '7' }, { code: 'Numpad8', label: '8' }, { code: 'Numpad9', label: '9' }, { code: 'NumpadAdd', label: '+' } // height hack later?
        ]);
        this.renderRow(numSection, [
            { code: 'Numpad4', label: '4' }, { code: 'Numpad5', label: '5' }, { code: 'Numpad6', label: '6' }, { spacer: true } // Plus spans 2 rows usually
        ]);
        this.renderRow(numSection, [
            { code: 'Numpad1', label: '1' }, { code: 'Numpad2', label: '2' }, { code: 'Numpad3', label: '3' }, { code: 'NumpadEnter', label: 'Ent' }
        ]);
        this.renderRow(numSection, [
            { code: 'Numpad0', label: '0', cls: 'w-200' }, { code: 'NumpadDecimal', label: '.' }, { spacer: true } // Enter spans 2 rows
        ]);
        container.appendChild(numSection);
    },

    renderRow(section, keys) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'kb-row';

        keys.forEach(k => {
            const keyDiv = document.createElement('div');
            if (k.spacer) {
                keyDiv.className = k.spacer === 'half' ? 'spacer half' : 'spacer';
                rowDiv.appendChild(keyDiv);
                return;
            }

            keyDiv.className = 'key';
            if (k.cls) k.cls.split(' ').forEach(c => keyDiv.classList.add(c));

            keyDiv.textContent = k.label || k.code;
            keyDiv.id = `key-${k.code}`; // Vital for lookup

            rowDiv.appendChild(keyDiv);
        });
        section.appendChild(rowDiv);
    },

    /* --- Keyboard Handling --- */
    handleKeyDown(e) {
        e.preventDefault();
        this.activeKeys.add(e.code);
        this.updateKeyViz(e.code, e.key, true);
        this.updateGhostingCount();
    },

    handleKeyUp(e) {
        this.activeKeys.delete(e.code);
        this.updateKeyViz(e.code, e.key, false);
        this.updateGhostingCount();
    },

    updateGhostingCount() {
        document.getElementById('active-count').textContent = this.activeKeys.size;
    },

    updateKeyViz(code, label, isActive) {
        const keyEl = document.getElementById(`key-${code}`);

        if (keyEl) {
            if (isActive) {
                keyEl.classList.add('active');

                // --- MULTI-LANGUAGE AUTO-DETECT LOGIC ---
                // If the key label printed is a single char (e.g. 'a', 'q') and case-insensitive match fails
                // Update the visual label to match user's reality.
                // Ex: User presses 'A' (code KeyQ on AZERTY). We see KeyQ.
                // If we labeled it 'Q' but receive 'a', we update to 'A'.

                if (label && label.length === 1) {
                    const char = label.toUpperCase();
                    if (keyEl.textContent !== char && !keyEl.classList.contains('modified')) {
                        keyEl.textContent = char;
                        keyEl.style.color = '#007AFF'; // Visual cue that we learned this layout
                        keyEl.classList.add('modified');
                    }
                }
            } else {
                keyEl.classList.remove('active');
            }
        } else {
            console.log("Unmapped key:", code);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => InputLab.init());
