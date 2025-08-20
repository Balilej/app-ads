# VHS Horror Theme • Analog Decay Aesthetic Framework

> 🎥 **"I want this vibe from the mainpage"** - A complete extraction of the VHS/analog horror aesthetic into a reusable theme framework.

This repository contains a modular VHS Horror theme extracted from the distinctive aesthetic of the original MainPage.html. Transform any website into a corrupted analog horror experience with glitch effects, VHS static, and time-based degradation.

## 🚀 Quick Start

### Option 1: Complete Experience (Recommended)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="vhs-horror.css">
</head>
<body>
    <script src="vhs-horror.js"></script>
    <script>
        const vhsTheme = new VHSHorrorTheme();
        vhsTheme.init();
    </script>
</body>
</html>
```

### Option 2: CSS Only (Static Styling)
```html
<link rel="stylesheet" href="vhs-horror.css">
<body class="vhs-theme">
    <div class="vhs-static"></div>
    <div class="vhs-lines"></div>
    <div class="vhs-horror-bg"></div>
    <!-- Your content with VHS classes -->
</body>
```

## 🎨 The Vibe

### Visual Aesthetic
- **Dark, muted color palette** - Grays, dirty whites, blood reds, sickly yellows
- **VHS static overlays** - Animated scan lines and film grain
- **Glitch effects** - Text corruption, chromatic aberration, digital decay
- **Horror atmosphere** - Subtle gradients, shadowy backgrounds
- **Retro typography** - VT323, Courier Prime, Share Tech Mono fonts

### Interactive Elements
- **Audio ambience** - Low frequency hum and static noise
- **Dynamic corruption** - Random visual distortions and text glitching
- **Time-based escalation** - Effects intensify the longer you stay
- **Subliminal messaging** - Brief flashes of ominous text
- **Cursor interference** - Occasional glitch effects following mouse movement

### Technical Features
- **Modular CSS classes** for easy component styling
- **JavaScript API** for custom implementations
- **Responsive design** that works across devices
- **Performance optimized** with efficient animations
- **Zero dependencies** - pure CSS and vanilla JavaScript

## 📁 File Structure

```
├── index.html          # Demo showcase and documentation
├── MainPage.html       # Original page with the full vibe
├── vhs-horror.css      # Complete theme stylesheet
├── vhs-horror.js       # Interactive effects module
├── app-ads.txt         # Ads configuration
└── README.md           # This file
```

## 🎬 Component Library

### Typography Components

```html
<!-- Glitched title with corruption effects -->
<h1 class="vhs-title" data-glitch-text="CORRUPTED" data-glitch-alt="C█RR█PT█D">
    MAIN TITLE
</h1>

<!-- Flickering subtitle -->
<p class="vhs-subtitle">◉ Transmission Interrupted ◉</p>

<!-- Animated corruption text -->
<div class="vhs-corrupted-text">Signal degraded</div>
```

### Layout Components

```html
<!-- VHS-styled card -->
<div class="vhs-card">
    <h3>Card Title</h3>
    <p>Content with automatic hover corruption effects</p>
    <a href="#" class="vhs-button">◉ Action ◉</a>
</div>

<!-- Grid layout -->
<div class="vhs-grid">
    <div class="vhs-card">Card 1</div>
    <div class="vhs-card">Card 2</div>
    <div class="vhs-card">Card 3</div>
</div>
```

### Interactive Elements

```html
<!-- Buttons with glitch hover effects -->
<a href="#" class="vhs-button">◉ Primary Action ◉</a>

<!-- Subliminal text (JavaScript controlled) -->
<div id="vhs-subliminal" class="vhs-subliminal"></div>
```

## ⚙️ JavaScript API

### Basic Initialization

```javascript
const vhsTheme = new VHSHorrorTheme({
    enableAudio: true,           // Ambient sound effects
    enableStatic: true,          // Canvas static generation
    enableCorruption: true,      // Visual corruption effects
    enableSubliminal: true,      // Subliminal text flashes
    enableEscalation: true,      // Time-based intensification
    staticIntensity: 0.12,       // Static opacity (0-1)
    corruptionFrequency: 2000,   // Corruption interval (ms)
    subliminalMessages: [        // Custom subliminal messages
        'CUSTOM MESSAGE 1',
        'CUSTOM MESSAGE 2'
    ]
});

vhsTheme.init();
```

### Apply Theme to Specific Elements

```javascript
// Apply to individual elements
vhsTheme.applyToElement('#my-title', 'title');
vhsTheme.applyToElement('.my-cards', 'card');
vhsTheme.applyToElement('#my-button', 'button');

// Available types: 'title', 'subtitle', 'card', 'button', 'corrupted-text'
```

### Control Methods

```javascript
// Manual corruption effects
vhsTheme.jumpScare();
vhsTheme.createInterference(x, y);

// Clean up and destroy
vhsTheme.destroy();
```

## 🎨 CSS Variables & Customization

The theme uses CSS custom properties for easy customization:

```css
:root {
    --vhs-gray-light: #555555;      /* Light gray text */
    --vhs-gray-dark: #2a2a2a;       /* Dark backgrounds */
    --vhs-gray-darker: #111111;     /* Darker backgrounds */
    --vhs-gray-bg: #050505;         /* Main background */
    --vhs-dirty-white: #888888;     /* Primary text color */
    --vhs-blood-red: #3a0a0a;       /* Accent/danger color */
    --vhs-sickly-yellow: #3a3a15;   /* Warning/highlight color */
    --vhs-noise: #1a1a1a;          /* Noise overlay color */
    --vhs-hell-gray: #0a0a0a;      /* Deep background */
    --vhs-corrupt-gray: #333333;    /* Corrupted elements */
}
```

### Override for Custom Colors

```css
.vhs-theme {
    --vhs-blood-red: #4a0e0e;      /* Lighter red variant */
    --vhs-sickly-yellow: #4a4a20;   /* Lighter yellow variant */
}
```

## 🎯 Usage Examples

### 1. Landing Page with Full Effects
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Analog Horror Site</title>
    <link rel="stylesheet" href="vhs-horror.css">
</head>
<body>
    <header>
        <h1 class="vhs-title" data-glitch-text="W█LC█M█" data-glitch-alt="▓ELC▓ME">WELCOME</h1>
        <p class="vhs-subtitle">◉ Signal Acquired ◉</p>
    </header>

    <main>
        <div class="vhs-grid">
            <div class="vhs-card">
                <h3>Project Alpha</h3>
                <p>Classified information...</p>
                <a href="#" class="vhs-button">◉ Access ◉</a>
            </div>
        </div>
    </main>

    <script src="vhs-horror.js"></script>
    <script>
        new VHSHorrorTheme().init();
    </script>
</body>
</html>
```

### 2. Minimal Static Styling
```html
<link rel="stylesheet" href="vhs-horror.css">
<body class="vhs-theme">
    <div class="vhs-static"></div>
    <div class="vhs-lines"></div>
    
    <h1 class="vhs-title">Static Horror Title</h1>
    <div class="vhs-card">
        <p>Content with VHS styling but no JavaScript effects</p>
    </div>
</body>
```

### 3. Custom Configuration
```javascript
const customTheme = new VHSHorrorTheme({
    enableAudio: false,              // Disable audio
    staticIntensity: 0.05,           // Subtle static
    corruptionFrequency: 5000,       // Less frequent corruption
    subliminalMessages: [            // Custom messages
        'LOADING...',
        'PROCESSING...',
        'ANALYZING...'
    ],
    enableEscalation: false          // No time-based escalation
});

customTheme.init();
```

## 🎮 Interactive Demo

Visit `index.html` for a complete interactive demonstration featuring:

- **Live component showcase** with all theme elements
- **Toggle controls** for different effects
- **Usage examples** and code snippets
- **Download links** for theme files

**🔗 [Live Demo](./index.html) | [Original Source](./MainPage.html)**

## 🛠️ Browser Support

- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **CSS Grid & Flexbox** support required
- **Web Audio API** for audio effects (graceful degradation)
- **Canvas 2D** for static generation

## 📱 Mobile Responsive

The theme includes responsive breakpoints:
- Adjusted typography scaling
- Grid layout optimization
- Touch-friendly interface elements
- Performance optimizations for mobile

## ⚡ Performance

- **Efficient animations** using transform and opacity
- **RequestAnimationFrame** for smooth effects
- **Lazy initialization** of heavy effects
- **Memory management** with proper cleanup

## 🎪 Advanced Usage

### Creating Custom Corruption Effects

```javascript
// Custom text corruption
const corruptedText = vhsTheme.corruptText('Original Text');

// Manual page corruption
vhsTheme.pageCorruption();

// Custom interference at specific coordinates
vhsTheme.createInterference(100, 200);
```

### Integrating with Other Frameworks

```javascript
// React integration example
useEffect(() => {
    const theme = new VHSHorrorTheme({ enableEscalation: false });
    theme.init();
    
    return () => theme.destroy(); // Cleanup
}, []);

// Vue integration example
mounted() {
    this.vhsTheme = new VHSHorrorTheme();
    this.vhsTheme.init();
},
beforeDestroy() {
    this.vhsTheme.destroy();
}
```

## 🎨 Design Philosophy

This theme extracts the **essence of analog horror** - the feeling of watching something you shouldn't, the gradual corruption of digital media, and the uncanny valley of technology gone wrong. It's designed to be:

- **Immersive** - Effects that respond to user interaction
- **Subtle** - Horror through suggestion rather than shock
- **Nostalgic** - Authentic VHS and CRT aesthetics
- **Modular** - Use as much or as little as needed

## 📸 Screenshots

### Original MainPage.html
The source of the extracted vibe - full analog horror experience with projects showcase.

### index.html Demo
Interactive component library and usage documentation with live examples.

### Modular Implementation
Clean integration into existing websites with customizable intensity.

## 🔧 Contributing

To contribute to the VHS Horror theme:

1. **Fork** the repository
2. **Extract** additional components from MainPage.html
3. **Test** across different browsers and devices
4. **Document** new features and usage examples
5. **Submit** a pull request

## 📄 License

This VHS Horror theme is part of the analog horror aesthetic exploration. The original MainPage.html serves as the artistic source, and this extraction makes the distinctive "vibe" reusable across projects.

---

**🎥 "The vibe has been successfully extracted and modularized for digital propagation."**

*Transform any website into a corrupted transmission from another time. The static never stops.*