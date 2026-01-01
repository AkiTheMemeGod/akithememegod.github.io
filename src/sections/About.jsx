import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassCard } from '../components/ui/GlassCard';
import { Lightbulb, Coffee, Box } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const identities = [
    {
        id: '01',
        role: 'THE ARCHITECT',
        icon: Box,
        desc: "My code is cleaner than my apartment. I build systems so robust they judge me for my own sleep schedule. Structure is my love language.",
        color: 'text-blue-400',
        border: 'group-hover:border-blue-500/50',
        glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'
    },
    {
        id: '02',
        role: 'THE INNOVATOR',
        icon: Lightbulb,
        desc: "Safety third. I treat 'Impossible' as a dare. I don't think outside the box; I recycled the box into a 3D printer.",
        color: 'text-emerald-400',
        border: 'group-hover:border-emerald-500/50',
        glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'
    },
    {
        id: '03',
        role: 'THE NERD',
        icon: Coffee,
        desc: "I judge kerning in real life. Powered by caffeine and a compulsive need to fix things that aren't broken. 1px off is a personal insult.",
        color: 'text-purple-400',
        border: 'group-hover:border-purple-500/50',
        glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]'
    }
];

export function About() {
    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Header: Simple Fade In
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            );

            // Cards: Poppy Staggered Entry (No Scrub)
            gsap.fromTo(cardsRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2, // Distinct 200ms delay between each card
                    ease: "back.out(1.7)", // Slight bounce for "pop" effect
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={containerRef} className="relative min-h-[90vh] py-32 w-full flex flex-col items-center justify-center px-6 bg-black">

            <div className="max-w-7xl w-full">

                {/* Section Header */}
                <div ref={headerRef} className="mb-20 text-center space-y-4 opacity-0">
                    <p className="font-mono text-xs text-white/40 tracking-[0.3em] uppercase">
                        System Identity
                    </p>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                        BEHIND THE TERMINAL
                    </h2>
                </div>

                {/* Identity Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {identities.map((item, index) => (
                        <div key={item.id} className="perspective-1000">
                            <div ref={el => cardsRef.current[index] = el} className="h-full opacity-0">
                                <GlassCard className={`relative h-full p-8 md:p-10 flex flex-col items-center text-center justify-start group transition-all duration-500 hover:-translate-y-2 ${item.border} ${item.glow}`}>

                                    {/* Combined Header Pill */}
                                    <div className={`flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 mb-8 group-hover:scale-105 transition-transform duration-300`}>
                                        <item.icon className={`w-5 h-5 ${item.color}`} />
                                        <h3 className="text-lg font-bold text-white tracking-widest uppercase">
                                            {item.role}
                                        </h3>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4">
                                        <div className={`w-8 h-[2px] mx-auto ${item.color.replace('text-', 'bg-')} opacity-50`} />
                                        <p className="text-white/60 leading-relaxed font-light text-base md:text-lg">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {/* Decorative ID */}
                                    <div className="mt-8 pt-6 border-t border-white/5 w-full flex-grow flex items-end justify-center">
                                        <span className="font-mono text-xs text-white/20 tracking-[0.2em]">{item.id}</span>
                                    </div>

                                    {/* NOTE: Removed the bg-gradient overlay to fix "white box" issue */}

                                </GlassCard>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
