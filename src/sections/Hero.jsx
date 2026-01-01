import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Github, Linkedin } from 'lucide-react';

export function Hero() {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const scrollRef = useRef(null);
    const displacementRef = useRef(null);
    const turbulenceRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.2 });

            // Image Assembly Animation (Reverse Disintegration)
            const primitiveValues = { scale: 500 };

            tl.to(primitiveValues, {
                scale: 0,
                duration: 2.5,
                ease: "power2.out",
                onUpdate: () => {
                    if (displacementRef.current) {
                        displacementRef.current.scale.baseVal = primitiveValues.scale;
                    }
                }
            }, 0);

            tl.fromTo(imageRef.current,
                { opacity: 0, filter: 'grayscale(100%) blur(20px)' },
                { opacity: 1, filter: 'grayscale(100%) blur(0px)', duration: 2.5, ease: 'power2.out' },
                0
            );

            // Content Reveal (Slide from Left)
            tl.fromTo(contentRef.current.children,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' },
                "-=1.5"
            );

            // Scroll Indicator
            tl.fromTo(scrollRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
                "-=0.5"
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-between px-6 md:px-20 overflow-hidden bg-black">

            {/* SVG Filter Definition for Disintegration Effect */}
            <svg className="hidden">
                <defs>
                    <filter id="disintegration">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.05"
                            numOctaves="2"
                            result="noise"
                            ref={turbulenceRef}
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale="500"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            ref={displacementRef}
                        />
                    </filter>
                </defs>
            </svg>

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black opacity-50" />
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            </div>

            {/* Content Side (Left) */}
            <div ref={contentRef} className="relative z-20 flex flex-col items-start max-w-4xl pt-20">

                {/* The Name - Massive Professional UI Intent (Static Gradient) */}
                <div className="relative z-10 -ml-2 md:-ml-4 select-none">
                    <h1 className="text-[10rem] md:text-[14rem] lg:text-[16rem] leading-[0.8] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-600">
                        Akash K.
                    </h1>
                </div>

                {/* The Headline */}
                <div className="mt-8 md:mt-10 space-y-6 pl-2 md:pl-4 border-l-2 border-red-500/50">
                    <div className="space-y-4">
                        <p className="text-2xl md:text-3xl font-mono font-medium text-red-400 tracking-wide">
                            I SPEAK FLUENT MACHINE.
                        </p>
                        <p className="text-neutral-500 text-sm md:text-base max-w-md font-light tracking-wider uppercase leading-relaxed">
                            Turning caffeine into compiled code <br />
                            and chaos into order.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6 pt-2">
                        <a
                            href="https://github.com/AkiTheMemeGod"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white transition-colors duration-300 transform hover:scale-110"
                            aria-label="GitHub"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/akash-k19052022/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white transition-colors duration-300 transform hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                    </div>
                </div>

            </div>

            {/* Image Side (Right) - Absolute on desktop to span height */}
            <div className="absolute top-0 right-0 h-full w-full md:w-1/2 z-10 pointer-events-none mix-blend-screen">
                <div ref={imageRef} className="relative w-full h-full" style={{ filter: 'url(#disintegration) grayscale(100%)' }}>
                    {/* The Image */}
                    <img
                        src="/me.png"
                        alt="Akash K"
                        className="w-full h-full object-cover object-[center_top] md:object-[left_center]"
                    />

                    {/* Gradient Masks for blending */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-50" />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div ref={scrollRef} className="absolute bottom-12 left-12 flex items-center gap-4 opacity-0 z-20">
                <div className="h-[1px] w-12 bg-gradient-to-r from-white to-transparent" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 animate-pulse">
                    Initialize Sequence
                </span>
            </div>

        </section>
    );
}
