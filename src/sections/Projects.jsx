import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Cpu, Shield, Brain, Database } from 'lucide-react';

const projects = [
    {
        title: 'RelayMail',
        category: 'Infrastructure',
        icon: Cpu,
        description: 'High-performance SMTP routing service. Designed with parallelized mail delivery pipelines, webhook event triggers, and sub-millisecond dispatch queues to serve as a reliable drop-in replacement for legacy mailing engines.',
        tags: ['Python', 'Flask', 'SQLAlchemy', 'SMTP'],
        color: 'from-red-500/10 via-zinc-950 to-zinc-950',
        accent: 'text-red-400',
        border: 'hover:border-red-500/25',
        link: 'https://relaymail.pythonanywhere.com',
    },
    {
        title: 'AnarchKey',
        category: 'Security',
        icon: Shield,
        description: 'Zero-knowledge credentials vault and API key controller. Securely stores, encrypts, and auto-rotates developer secrets using verified cryptographic hashing and decentralized key distribution nodes.',
        tags: ['Node.js', 'Express.js', 'RelayMail', 'MongoDB', 'Redis'],
        color: 'from-cyan-500/10 via-zinc-950 to-zinc-950',
        accent: 'text-cyan-400',
        border: 'hover:border-cyan-500/25',
        link: 'https://anarchkey.vercel.app',
    },
    {
        title: 'MindVault',
        category: 'AI Platform',
        icon: Brain,
        description: 'Local LLM cognitive mapping tool and knowledge synthesizer. Automatically index document sets, parse context arrays, and construct interactive learning node trees via local Ollama deployments.',
        tags: ['Node.js', 'MongoDB', 'Ollama', 'Express.js'],
        color: 'from-purple-500/10 via-zinc-950 to-zinc-950',
        accent: 'text-purple-400',
        border: 'hover:border-purple-500/25',
        link: 'https://github.com/AkiTheMemeGod/MindVault',
    },
    {
        title: 'ProtoBase',
        category: 'DevTools',
        icon: Database,
        description: 'Declarative database schema designer and mocking server. Dynamically provisions sandboxed SQLite schemas, generates mock JSON models, and builds standardized REST endpoints with OpenAPI spec sync.',
        tags: ['Python', 'Flask', 'SQL', 'JavaScript', 'Tailwind'],
        color: 'from-emerald-500/10 via-zinc-950 to-zinc-950',
        accent: 'text-emerald-400',
        border: 'hover:border-emerald-500/25',
        link: 'https://protobase.pythonanywhere.com',
    }
];

export function Projects() {
    const containerRef = useRef(null);

    return (
        <section 
            id="work" 
            ref={containerRef} 
            className="relative min-h-screen w-full bg-black px-6 md:px-20 py-32 flex flex-col items-center"
        >
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* Section Header */}
            <div className="z-10 text-center mb-24">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                    [ PORTFOLIO WORKS ]
                </span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-2">
                    SELECTED PROJECTS
                </h2>
            </div>

            {/* Stacking Card List */}
            <div className="relative w-full max-w-5xl flex flex-col items-center z-10">
                {projects.map((project, index) => (
                    <ProjectCard 
                        key={project.title} 
                        project={project} 
                        index={index} 
                    />
                ))}
            </div>

        </section>
    );
}

function ProjectCard({ project, index }) {
    const cardRef = useRef(null);

    // Track scroll progress of this specific card to apply stack animation
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start start", "end start"]
    });

    // Map scroll progress to scale, opacity, and positioning shifts
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.55]);

    return (
        <div 
            ref={cardRef} 
            className="sticky top-28 md:top-36 w-full max-w-5xl h-[460px] md:h-[520px] mb-20 md:mb-32"
        >
            <motion.div
                style={{ scale, opacity }}
                className={`relative w-full h-full rounded-2xl bg-zinc-950/80 border border-white/5 overflow-hidden transition-all duration-300 ${project.border} p-8 md:p-12 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)]`}
            >
                {/* Tech Grid & Subtle Gradient Background */}
                <div className="absolute inset-0 bg-grid opacity-[0.12] pointer-events-none" />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 pointer-events-none mix-blend-screen`} />

                {/* Card Top: Header */}
                <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                            <div className={`p-1.5 rounded-lg bg-zinc-900 border border-white/5 ${project.accent}`}>
                                <project.icon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                                {project.category}
                            </span>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none mt-2">
                            {project.title}
                        </h3>
                    </div>

                    {/* External Link */}
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-zinc-900 hover:bg-white text-zinc-400 hover:text-black border border-white/5 hover:border-white transition-all duration-300 cursor-pointer"
                        aria-label={`Open ${project.title}`}
                    >
                        <ArrowUpRight className="w-5 h-5" />
                    </a>
                </div>

                {/* Card Bottom: Info & Tech Tags */}
                <div className="space-y-6 max-w-3xl relative z-10 mt-auto">
                    <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed font-sans">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2.5 pt-2">
                        {project.tags.map((tag) => (
                            <span 
                                key={tag} 
                                className="px-3.5 py-1.5 text-xs font-mono text-zinc-400 bg-zinc-900/50 border border-white/5 rounded-lg"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
