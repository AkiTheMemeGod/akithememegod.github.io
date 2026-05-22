import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
    {
        role: 'Project Intern',
        company: 'CheckPoint Systems',
        period: 'Feb 2025 - Jul 2025',
        description: 'Engineered high-throughput telemetry microservices. Refactored bottleneck endpoints, optimized query patterns on distributed database backends, and established automated integration testing suites.',
        color: 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]',
        text: 'text-red-400'
    },
    {
        role: 'Open Source Contributor',
        company: 'GitHub / PyPI / npm',
        period: '2024 - Present',
        description: 'Contributed to utility libraries and developer tools in Python and JavaScript. Solved package serialization bugs, improved runtime efficiency, and authored declarative configuration schemas.',
        color: 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]',
        text: 'text-cyan-400'
    },
    {
        role: 'Freelance Developer',
        company: 'Self-Employed',
        period: '2023 - Present',
        description: 'Architected full-stack web applications for early-stage startups. Consulted on secure authentication policies, implemented isolated database configurations, and built responsive React interfaces.',
        color: 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]',
        text: 'text-purple-400'
    }
];

export function Experience() {
    const containerRef = useRef(null);

    // Track scroll progress of the experience container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section 
            id="experience" 
            ref={containerRef} 
            className="relative min-h-screen py-32 w-full bg-black flex flex-col items-center overflow-hidden"
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.03),transparent_70%)] pointer-events-none z-0" />

            <div className="text-center mb-24 relative z-20 w-full">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                    [ HISTORY ]
                </span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-2">
                    THE JOURNEY
                </h2>
            </div>

            <div className="max-w-4xl w-full relative z-10 px-6 flex flex-col items-center">
                {/* Static base timeline line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-900 -translate-x-1/2 pointer-events-none" />

                {/* Animated active scroll progress line */}
                <motion.div 
                    style={{ scaleY }}
                    className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-500 to-purple-500 origin-top -translate-x-1/2 pointer-events-none z-10"
                />

                <div className="w-full flex flex-col gap-20">
                    {experiences.map((exp, idx) => (
                        <ExperienceItem key={idx} exp={exp} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ExperienceItem({ exp, index }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full flex flex-col md:flex-row relative ${
                isEven ? 'md:justify-start' : 'md:justify-end'
            }`}
        >
            {/* Timeline Dot Anchor */}
            <div 
                className={`absolute left-8 md:left-1/2 top-9 w-3 h-3 rounded-full bg-black border-2 ${exp.color} -translate-x-1/2 z-20`}
            />

            {/* Content Container */}
            <div 
                className={`w-full md:w-[45%] pl-16 md:pl-0 ${
                    isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                }`}
            >
                <div className="p-6 md:p-8 bg-zinc-950/40 border border-white/5 rounded-2xl flex flex-col space-y-3 hover:border-white/10 transition-colors">
                    <span className={`font-mono text-xs ${exp.text} tracking-wider`}>
                        {exp.period}
                    </span>
                    <h3 className="text-xl font-medium text-white tracking-wide">
                        {exp.role}
                    </h3>
                    <div className={`text-xs uppercase tracking-widest text-zinc-500 font-mono ${
                        isEven ? 'md:text-right' : 'md:text-left'
                    }`}>
                        {exp.company}
                    </div>
                    <p className="text-zinc-400 text-sm font-light leading-relaxed font-sans pt-2">
                        {exp.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
