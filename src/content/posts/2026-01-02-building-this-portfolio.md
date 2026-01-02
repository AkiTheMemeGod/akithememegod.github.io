---
title: "Building This Portfolio: React, Three.js, and Sleep Deprivation"
date: "2026-01-02"
description: "A deep dive into the tech stack. If you wish to defeat me, you must train for another 100 years."
tags: ["react", "threejs", "gsap", "frontend"]
readTime: "8 min read"
---

I looked at the internet. I saw grids. I saw thumbnails. I saw boredom.

I decided to destroy boredom.

This portfolio is the result of me obsessing over scroll physics and lighting engines until my eyes started seeing wireframes in real life. Here is how I built it.

## The Stack (My Weapons of Choice)

*   **Core**: React + Vite (Because waiting for Webpack is for casuals)
*   **Styling**: TailwindCSS (Css is hard) + Custom GLSL Shaders (Because I like pain)
*   **Motion**: GSAP + Lenis (Physics are just suggestions)
*   **3D**: React Three Fiber

## Challenge 1: The "Apple" Glass Effect

Standard CSS blur filters look like frosted shower curtains. To get that premium look, you need to layer shadows like you're playing 4D chess.

> "Good design is as little design as possible."
> — *Dieter Rams* (He clearly never had to center a div)

I created a custom utility class that layers noise textures. It’s subtle. It’s expensive for the GPU. It’s worth it.

```css
/* The Secret Sauce */
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px); /* My GPU is crying */
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 4px 24px -1px rgba(0, 0, 0, 0.2), /* Shadow 1 */
    inset 0 0 20px rgba(255, 255, 255, 0.02); /* Inner Glow */
}
```

## Challenge 2: Syncing DOM with Scroll

The ScrollTrigger integration was tricky. I needed the text to fade in *exactly* when the user scrolled to a specific point.

The fix was hooking GSAP directly into Lenis's `raf` loop. Basically, I forced two different physics engines to hold hands and play nice.

```javascript
// Syncing the engines to create absolute order
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

// Telling GSAP to submit to my will
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
```

## The "Secret" Weapon

People ask what framework I used to write the content.

The answer is **Markdown**.

I built a custom ingestion engine that reads `.md` files directly from the file system. No CMS. No Database. No overhead. Just pure, unadulterated speed.

```javascript
// A peek at the innovative architecture
// (It's literally 3 lines of code but don't tell anyone)
const posts = import.meta.glob('../content/*.md');
```

## Conclusion

Building this taught me that "simple" is actually really, really hard. 

But when you see that smooth 60fps parallax effect? When the scroll physics land exactly on the pixel?

Victory.
