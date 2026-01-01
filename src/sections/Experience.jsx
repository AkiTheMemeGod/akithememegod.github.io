import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassCard } from '../components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        role: 'Full-Stack Developer',
        company: 'CheckPoint Systems',
        period: 'Feb 2025 - Jul 2025',
        description: 'Engineering the backbone of real-time systems. Optimized critical API infrastructure for speed and reliability.',
        theme: 'blue'
    },
    {
        role: 'Open Source Contributor',
        company: 'GitHub / PyPI / Npm / Dart',
        period: '2024 - Present',
        description: 'Contributing to the global developer commons. Building public utilities that empower the community.',
        theme: 'emerald'
    },
    {
        role: 'Freelance Developer',
        company: 'Self-Employed',
        period: '2023 - Present',
        description: 'Transforming client visions into secure, scalable digital architectures. Consulting on security and performant stack design.',
        theme: 'purple'
    }
];

const colorVariants = {
    blue: {
        dotBorder: 'border-blue-500',
        dotShadow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]',
        cardHover: 'hover:border-blue-500/30',
        text: 'text-blue-400'
    },
    emerald: {
        dotBorder: 'border-emerald-500',
        dotShadow: 'shadow-[0_0_15px_rgba(16,185,129,0.5)]',
        cardHover: 'hover:border-emerald-500/30',
        text: 'text-emerald-400'
    },
    purple: {
        dotBorder: 'border-purple-500',
        dotShadow: 'shadow-[0_0_15px_rgba(168,85,247,0.5)]',
        cardHover: 'hover:border-purple-500/30',
        text: 'text-purple-400'
    }
};

export function Experience() {
    const containerRef = useRef(null);
    const pathRef = useRef(null);
    // Refs for the specific connection points on the cards
    const dotsRef = useRef([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            let drawTween;

            function updatePath() {
                if (!containerRef.current || dotsRef.current.length === 0 || !pathRef.current) return;

                // Get container bounds relative to viewport/page
                const containerRect = containerRef.current.getBoundingClientRect();
                const startX = containerRect.width / 2;
                const startY = 0;

                // Get dot positions
                const points = dotsRef.current.map(dot => {
                    if (!dot) return { x: startX, y: 0 };
                    const rect = dot.getBoundingClientRect();
                    return {
                        x: rect.left - containerRect.left + (rect.width / 2),
                        y: rect.top - containerRect.top + (rect.height / 2)
                    };
                });

                // Construct Path with Organic S-Curves
                let pathString = `M ${startX} ${startY}`;

                // Weave Logic: Force the line to "meander" or "snake"
                const osc = 60; // Amplitude of the weave (px)

                // 1. Connect Start to First Point
                if (points.length > 0) {
                    pathString += ` C ${startX} ${points[0].y * 0.5} ${points[0].x} ${points[0].y * 0.5} ${points[0].x} ${points[0].y}`;
                }

                // 2. Connect sequential points with CONSTANT sway
                for (let i = 0; i < points.length - 1; i++) {
                    const current = points[i];
                    const next = points[i + 1];
                    const midY = current.y + (next.y - current.y) / 2;

                    // CONSTANT Direction to avoid kinks
                    // We always curve Out (Right) then In (Left).
                    // This creates a smooth repeating S-wave pattern.
                    const dir = 1;

                    // Control Points
                    const c1x = current.x + (osc * dir);  // Start by going Right
                    const c2x = next.x + (osc * -dir);    // Arrive by coming from Left (so vector points Right)

                    pathString += ` C ${c1x} ${midY} ${c2x} ${midY} ${next.x} ${next.y}`;
                }

                // Update Path
                pathRef.current.setAttribute('d', pathString);

                // ROBUST ANIMATION STRATEGY:
                // 1. Calculate length
                const length = pathRef.current.getTotalLength();

                // 2. Set Dasharray (so the line CAN be drawn) but leave offset at 0 (Visible)
                gsap.set(pathRef.current, {
                    strokeDasharray: length,
                    strokeDashoffset: 0,
                    autoAlpha: 1
                });

                if (drawTween) {
                    drawTween.kill();
                }

                // 3. Animate FROM 'hidden' (offset=length) TO 'visible' (offset=0)
                drawTween = gsap.from(pathRef.current, {
                    strokeDashoffset: length,
                    duration: 2,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        end: "bottom center",
                        scrub: 1,
                    }
                });
            }

            // Initial delay to ensure layout
            const timer = setTimeout(() => {
                updatePath();
                ScrollTrigger.refresh();
            }, 500);

            window.addEventListener('resize', updatePath);

            // Nodes Entry Animation
            const nodes = gsap.utils.toArray('.experience-node');
            nodes.forEach((node, i) => {
                gsap.from(node, {
                    opacity: 0,
                    scale: 0.5,
                    filter: 'blur(20px)',
                    duration: 0.6,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: node,
                        start: "top 85%",
                        end: "top 20%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            return () => {
                window.removeEventListener('resize', updatePath);
                clearTimeout(timer);
            };

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" ref={containerRef} className="relative min-h-[150vh] py-32 w-full bg-black flex flex-col items-center">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-black pointer-events-none z-0" />

            <div className="text-center mb-20 relative z-20 w-full">
                <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white">The Journey</h2>
                <p className="text-white/40 text-sm tracking-widest uppercase mt-2">Connecting the Dots</p>
            </div>

            {/* SVG Container - Absolute covering the whole section */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <path
                    ref={pathRef}
                    stroke="#06b6d4"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    className="drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                />
            </svg>

            <div className="max-w-6xl w-full relative z-20 flex flex-col gap-32 md:gap-48 px-6">

                {experiences.map((exp, i) => {
                    const isEven = i % 2 === 0;
                    const variant = colorVariants[exp.theme];

                    return (
                        <div key={i} className={`experience-node w-full flex ${isEven ? 'justify-start md:justify-end md:pr-[50%]' : 'justify-start md:justify-start md:pl-[50%]'} relative`}>

                            {/* The Content Card */}
                            <div className={`relative w-full max-w-lg ${isEven ? 'md:pr-16 text-right' : 'md:pl-16 text-left'}`}>

                                {/* Connection Dot - The Anchor for our Line */}
                                <div
                                    ref={el => dotsRef.current[i] = el}
                                    className={`absolute top-8 w-4 h-4 rounded-full bg-black border-2 ${variant.dotBorder} ${variant.dotShadow} z-20
                                      ${isEven ? 'left-0 md:left-auto md:-right-2' : 'left-0 md:-left-2'}
                                    `}
                                />

                                <GlassCard className={`p-8 md:p-10 relative group ${variant.cardHover} transition-colors bg-white/[0.02]`}>
                                    <span className={`block font-mono text-xs mb-2 ${variant.text}`}>{exp.period}</span>
                                    <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                                    <p className="text-white/50 text-sm uppercase tracking-widest mb-4 border-b border-white/5 pb-4 inline-block">{exp.company}</p>
                                    <p className="text-white/70 font-light leading-relaxed text-sm md:text-base">{exp.description}</p>
                                </GlassCard>
                            </div>
                        </div>
                    );
                })}

            </div>
        </section>
    );
}
