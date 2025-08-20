/**
 * VHS Horror Theme JavaScript Module
 * Interactive effects for creating analog horror aesthetic
 */

class VHSHorrorTheme {
    constructor(options = {}) {
        this.options = {
            enableAudio: options.enableAudio !== false,
            enableStatic: options.enableStatic !== false,
            enableCorruption: options.enableCorruption !== false,
            enableSubliminal: options.enableSubliminal !== false,
            enableEscalation: options.enableEscalation !== false,
            staticIntensity: options.staticIntensity || 0.12,
            corruptionFrequency: options.corruptionFrequency || 2000,
            subliminalMessages: options.subliminalMessages || this.getDefaultSubliminalMessages(),
            ...options
        };

        this.audioContext = null;
        this.staticNoiseNode = null;
        this.lowFreqOscillator = null;
        this.timeOnPage = 0;
        this.originalTitle = document.title;
        this.isInitialized = false;
    }

    /**
     * Initialize the VHS horror theme
     */
    init() {
        if (this.isInitialized) return;
        
        this.setupHTML();
        if (this.options.enableStatic) this.initStaticCanvas();
        if (this.options.enableCorruption) this.initCorruptionEffects();
        if (this.options.enableSubliminal) this.initSubliminalText();
        if (this.options.enableEscalation) this.initTimeEscalation();
        
        this.setupEventListeners();
        this.isInitialized = true;
    }

    /**
     * Set up required HTML elements
     */
    setupHTML() {
        // Add theme class to body
        document.body.classList.add('vhs-theme');

        // Create VHS overlays
        if (!document.querySelector('.vhs-static')) {
            const staticOverlay = document.createElement('div');
            staticOverlay.className = 'vhs-static';
            document.body.appendChild(staticOverlay);
        }

        if (!document.querySelector('.vhs-lines')) {
            const linesOverlay = document.createElement('div');
            linesOverlay.className = 'vhs-lines';
            document.body.appendChild(linesOverlay);
        }

        if (!document.querySelector('.vhs-horror-bg')) {
            const horrorBg = document.createElement('div');
            horrorBg.className = 'vhs-horror-bg';
            document.body.appendChild(horrorBg);
        }

        // Create static canvas
        if (this.options.enableStatic && !document.querySelector('#vhs-static-canvas')) {
            const canvas = document.createElement('canvas');
            canvas.id = 'vhs-static-canvas';
            canvas.className = 'vhs-horror-static';
            canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -2;
                opacity: ${this.options.staticIntensity};
            `;
            document.body.appendChild(canvas);
        }

        // Create subliminal text element
        if (this.options.enableSubliminal && !document.querySelector('#vhs-subliminal')) {
            const subliminal = document.createElement('div');
            subliminal.id = 'vhs-subliminal';
            subliminal.className = 'vhs-subliminal';
            document.body.appendChild(subliminal);
        }

        // Add required CSS animations
        this.injectCSS();
    }

    /**
     * Inject required CSS for dynamic effects
     */
    injectCSS() {
        if (document.querySelector('#vhs-dynamic-css')) return;

        const style = document.createElement('style');
        style.id = 'vhs-dynamic-css';
        style.textContent = `
            .vhs-horror-static {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -2;
                opacity: 0.12;
            }

            @keyframes vhs-fadeOut {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0.3) translateY(-10px); }
            }
            
            .vhs-cursor-eye {
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, #ff0000 2px, transparent 3px, #333 8px, transparent 9px);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .vhs-fake-warning {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #1a1a1a;
                border: 2px solid #ff0000;
                color: #ff0000;
                padding: 10px;
                font-family: 'VT323', monospace;
                font-size: 12px;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.5s ease;
                max-width: 250px;
            }
            
            .vhs-watching-eye {
                position: fixed;
                width: 30px;
                height: 30px;
                background: radial-gradient(circle, #000 5px, #333 6px, #000 15px);
                border-radius: 50%;
                opacity: 0;
                transition: opacity 2s ease;
                z-index: 500;
            }
            
            .vhs-watching-eye::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 8px;
                height: 8px;
                background: #ff0000;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: vhs-eye-blink 4s infinite;
            }
            
            @keyframes vhs-eye-blink {
                0%, 95% { opacity: 1; }
                96%, 98% { opacity: 0; }
                99%, 100% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Initialize static canvas effect
     */
    initStaticCanvas() {
        const canvas = document.getElementById('vhs-static-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let staticCounter = 0;
        const generateStatic = () => {
            staticCounter++;
            if (staticCounter % 3 === 0) {
                const imageData = ctx.createImageData(canvas.width, canvas.height);
                const data = imageData.data;
                
                for (let i = 0; i < data.length; i += 4) {
                    const intensity = Math.random();
                    
                    // Occasionally add red pixels for unsettling effect
                    if (Math.random() > 0.999) {
                        data[i] = 255;     // Red
                        data[i + 1] = 0;   // Green  
                        data[i + 2] = 0;   // Blue
                        data[i + 3] = 30;  // Alpha
                    } else {
                        const gray = intensity * 120;
                        data[i] = gray;     // Red
                        data[i + 1] = gray; // Green
                        data[i + 2] = gray; // Blue
                        data[i + 3] = Math.random() * 40; // Alpha
                    }
                }
                
                // Occasionally add "faces" in the static
                if (Math.random() > 0.9995) {
                    const x = Math.floor(Math.random() * (canvas.width - 20));
                    const y = Math.floor(Math.random() * (canvas.height - 20));
                    
                    // Draw a subtle dark circle (like an eye)
                    for (let dx = -3; dx <= 3; dx++) {
                        for (let dy = -3; dy <= 3; dy++) {
                            if (dx*dx + dy*dy <= 9) {
                                const pixelIndex = ((y + dy) * canvas.width + (x + dx)) * 4;
                                if (pixelIndex >= 0 && pixelIndex < data.length) {
                                    data[pixelIndex] = 20;     // Dark red
                                    data[pixelIndex + 1] = 20; // Dark green
                                    data[pixelIndex + 2] = 20; // Dark blue
                                    data[pixelIndex + 3] = 80; // More visible
                                }
                            }
                        }
                    }
                }
                
                ctx.putImageData(imageData, 0, 0);
            }
        };

        setInterval(generateStatic, 30);

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    /**
     * Initialize corruption effects
     */
    initCorruptionEffects() {
        // Random visual corruption
        const corruptDisplay = () => {
            const elements = document.querySelectorAll('.vhs-card, .vhs-title, .vhs-subtitle, [class*="vhs-"]');
            if (elements.length === 0) return;
            
            const randomElement = elements[Math.floor(Math.random() * elements.length)];
            
            const effects = [
                'hue-rotate(180deg) contrast(2)',
                'invert(0.2) brightness(0.5)',
                'contrast(3) saturate(0)',
                'blur(1px) contrast(1.5)'
            ];
            
            randomElement.style.filter = effects[Math.floor(Math.random() * effects.length)];
            
            setTimeout(() => {
                randomElement.style.filter = '';
            }, 150 + Math.random() * 300);
        };

        setInterval(corruptDisplay, this.options.corruptionFrequency + Math.random() * 4000);

        // Page-wide corruption
        const pageCorruption = () => {
            const effects = [
                'contrast(3) brightness(0.5)',
                'invert(0.1) brightness(0.7) contrast(2)',
                'hue-rotate(180deg) contrast(1.5)',
                'blur(0.5px) contrast(2) brightness(0.6)',
                'saturate(0) contrast(2.5) brightness(0.4)'
            ];
            
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            document.body.style.filter = randomEffect;
            
            setTimeout(() => {
                document.body.style.filter = '';
            }, 80 + Math.random() * 120);
        };

        setInterval(pageCorruption, 8000 + Math.random() * 15000);

        // Text corruption
        const corruptText = () => {
            const textElements = document.querySelectorAll('.vhs-corrupted-text, [class*="vhs-"] p, [class*="vhs-"] h1, [class*="vhs-"] h2, [class*="vhs-"] h3');
            if (textElements.length > 0) {
                const randomElement = textElements[Math.floor(Math.random() * textElements.length)];
                const originalText = randomElement.textContent;
                
                // Temporarily corrupt the text
                const corruptedText = originalText.split('').map(char => {
                    if (Math.random() > 0.8) {
                        return ['█', '▓', '▒', '░', '■', '□'][Math.floor(Math.random() * 6)];
                    }
                    return char;
                }).join('');
                
                randomElement.textContent = corruptedText;
                
                setTimeout(() => {
                    randomElement.textContent = originalText;
                }, 200 + Math.random() * 500);
            }
        };

        setInterval(corruptText, 5000 + Math.random() * 10000);
    }

    /**
     * Initialize subliminal text effects
     */
    initSubliminalText() {
        let subliminalIndex = 0;
        const subliminalElement = document.getElementById('vhs-subliminal');
        if (!subliminalElement) return;

        const updateSubliminal = () => {
            subliminalElement.textContent = this.options.subliminalMessages[subliminalIndex];
            subliminalIndex = (subliminalIndex + 1) % this.options.subliminalMessages.length;
        };

        setInterval(updateSubliminal, 12000);
        updateSubliminal(); // Initialize
    }

    /**
     * Initialize time-based escalation effects
     */
    initTimeEscalation() {
        setInterval(() => {
            this.timeOnPage += 1000;
            
            // Manipulate browser title
            if (this.timeOnPage > 20000 && Math.random() > 0.95) {
                const creepyTitles = [
                    "THEY KNOW YOU'RE HERE",
                    "DO NOT CLOSE THIS TAB",
                    "WATCHING... WAITING...",
                    "SIGNAL INTERCEPTED",
                    "YOU CANNOT LEAVE",
                    this.originalTitle
                ];
                document.title = creepyTitles[Math.floor(Math.random() * creepyTitles.length)];
                
                setTimeout(() => {
                    document.title = this.originalTitle;
                }, 2000 + Math.random() * 3000);
            }
            
            // After 30 seconds, increase corruption frequency
            if (this.timeOnPage > 30000 && Math.random() > 0.98) {
                this.pageCorruption();
            }
            
            // After 60 seconds, add jump scares
            if (this.timeOnPage > 60000 && Math.random() > 0.999) {
                this.jumpScare();
            }
        }, 1000);
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Initialize audio on first user interaction
        if (this.options.enableAudio) {
            document.addEventListener('click', () => this.initAudio(), { once: true });
            document.addEventListener('mousemove', () => this.initAudio(), { once: true });
        }

        // Mouse interference effects
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.99) {
                this.createInterference(e.clientX, e.clientY);
            }
        });

        // Create cursor eye follower
        this.createCursorEye();
    }

    /**
     * Initialize audio context and ambient sounds
     */
    initAudio() {
        if (this.audioContext) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create low frequency ambient hum
            this.lowFreqOscillator = this.audioContext.createOscillator();
            const lowFreqGain = this.audioContext.createGain();
            this.lowFreqOscillator.type = 'sine';
            this.lowFreqOscillator.frequency.setValueAtTime(40, this.audioContext.currentTime);
            lowFreqGain.gain.setValueAtTime(0.02, this.audioContext.currentTime);
            this.lowFreqOscillator.connect(lowFreqGain);
            lowFreqGain.connect(this.audioContext.destination);
            this.lowFreqOscillator.start();
            
            // Create static noise
            const bufferSize = this.audioContext.sampleRate * 2;
            const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            
            this.staticNoiseNode = this.audioContext.createBufferSource();
            const staticGain = this.audioContext.createGain();
            this.staticNoiseNode.buffer = noiseBuffer;
            this.staticNoiseNode.loop = true;
            staticGain.gain.setValueAtTime(0.005, this.audioContext.currentTime);
            this.staticNoiseNode.connect(staticGain);
            staticGain.connect(this.audioContext.destination);
            this.staticNoiseNode.start();
            
        } catch (e) {
            console.log('Audio context not available');
        }
    }

    /**
     * Create interference effect at mouse position
     */
    createInterference(x, y) {
        const interferenceDiv = document.createElement('div');
        interferenceDiv.style.cssText = `
            position: fixed;
            left: ${x - 15}px;
            top: ${y - 15}px;
            width: 30px;
            height: 30px;
            background: rgba(85, 85, 85, 0.4);
            pointer-events: none;
            z-index: 999;
            animation: vhs-fadeOut 0.6s forwards;
            border-radius: 50%;
        `;
        
        document.body.appendChild(interferenceDiv);
        
        setTimeout(() => {
            if (document.body.contains(interferenceDiv)) {
                document.body.removeChild(interferenceDiv);
            }
        }, 600);
    }

    /**
     * Create cursor eye follower
     */
    createCursorEye() {
        const cursorEye = document.createElement('div');
        cursorEye.className = 'vhs-cursor-eye';
        document.body.appendChild(cursorEye);
        
        let cursorTimeout;
        document.addEventListener('mousemove', (e) => {
            cursorEye.style.left = (e.clientX - 10) + 'px';
            cursorEye.style.top = (e.clientY - 10) + 'px';
            
            // Sometimes show the eye following cursor
            if (Math.random() > 0.995) {
                cursorEye.style.opacity = '0.7';
                clearTimeout(cursorTimeout);
                cursorTimeout = setTimeout(() => {
                    cursorEye.style.opacity = '0';
                }, 1000 + Math.random() * 2000);
            }
        });
    }

    /**
     * Create jump scare effect
     */
    jumpScare() {
        const scareDiv = document.createElement('div');
        scareDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #ff0000;
            z-index: 99999;
            opacity: 0;
            pointer-events: none;
            font-size: 4rem;
            color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: VT323, monospace;
        `;
        scareDiv.textContent = 'YOU SHOULD NOT HAVE COME HERE';
        
        document.body.appendChild(scareDiv);
        
        scareDiv.style.opacity = '0.9';
        setTimeout(() => {
            scareDiv.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(scareDiv)) {
                    document.body.removeChild(scareDiv);
                }
            }, 200);
        }, 150);
        
        // Intensify audio during jump scare
        if (this.audioContext && this.lowFreqOscillator) {
            this.lowFreqOscillator.frequency.setValueAtTime(80, this.audioContext.currentTime);
            setTimeout(() => {
                this.lowFreqOscillator.frequency.setValueAtTime(40, this.audioContext.currentTime);
            }, 500);
        }
    }

    /**
     * Get default subliminal messages
     */
    getDefaultSubliminalMessages() {
        return [
            'YOU ARE BEING WATCHED',
            'SIGNAL LOST',
            'THEY KNOW WHERE YOU ARE',
            'CORRUPTED MEMORY',
            'NO ESCAPE FROM THIS PLACE',
            'STATIC CONSUMES ALL',
            'THE GRAY VOID CALLS YOUR NAME',
            'TRANSMISSION HIJACKED',
            'REALITY DEGRADES AROUND YOU',
            'HELP ME... PLEASE...',
            'SOMETHING IS BEHIND YOU',
            'DO NOT TURN AROUND',
            'YOUR SCREEN IS BEING MONITORED',
            'WE HAVE BEEN TRYING TO REACH YOU',
            'THE SIGNAL NEVER STOPS',
            'YOU SHOULD NOT BE HERE',
            'CLOSE THE BROWSER NOW',
            'IT KNOWS YOU ARE WATCHING'
        ];
    }

    /**
     * Apply VHS theme to specific elements
     */
    applyToElement(element, type = 'card') {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        
        if (!element) return;

        switch (type) {
            case 'title':
                element.classList.add('vhs-title');
                if (!element.getAttribute('data-glitch-text')) {
                    element.setAttribute('data-glitch-text', this.corruptText(element.textContent));
                }
                if (!element.getAttribute('data-glitch-alt')) {
                    element.setAttribute('data-glitch-alt', this.corruptText(element.textContent, true));
                }
                break;
            case 'subtitle':
                element.classList.add('vhs-subtitle');
                break;
            case 'card':
                element.classList.add('vhs-card');
                break;
            case 'button':
                element.classList.add('vhs-button');
                break;
            case 'corrupted-text':
                element.classList.add('vhs-corrupted-text');
                break;
        }
    }

    /**
     * Generate corrupted version of text
     */
    corruptText(text, alt = false) {
        return text.split('').map((char, i) => {
            if (Math.random() > (alt ? 0.7 : 0.8)) {
                return ['█', '▓', '▒'][Math.floor(Math.random() * 3)];
            }
            return char;
        }).join('');
    }

    /**
     * Destroy the theme and clean up
     */
    destroy() {
        // Remove theme class
        document.body.classList.remove('vhs-theme');
        
        // Remove created elements
        const elementsToRemove = [
            '.vhs-static',
            '.vhs-lines', 
            '.vhs-horror-bg',
            '#vhs-static-canvas',
            '#vhs-subliminal',
            '.vhs-cursor-eye',
            '#vhs-dynamic-css'
        ];
        
        elementsToRemove.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) element.remove();
        });

        // Stop audio
        if (this.audioContext) {
            this.audioContext.close();
        }

        // Reset title
        document.title = this.originalTitle;
        
        this.isInitialized = false;
    }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VHSHorrorTheme;
}

// Global access
window.VHSHorrorTheme = VHSHorrorTheme;