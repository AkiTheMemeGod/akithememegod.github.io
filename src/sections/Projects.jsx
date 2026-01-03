import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'RelayMail',
        category: 'Infrastructure',
        description: 'High-performance, reliable email delivery service designed as a drop-in replacement for legacy SMTP. Features real-time analytics, webhook events, and 99.99% uptime SLA.',
        tags: ['Python', 'Flask', 'SQLAlchemy'],
        gradient: 'from-pink-500 to-rose-500',
        accent: 'pink-500',
        hoverBorder: 'group-hover:border-pink-500/50',
        link: 'https://relaymail.pythonanywhere.com',
    },
    {
        title: 'AnarchKey',
        category: 'Security',
        description: 'Military-grade encrypted cloud API key manager. Securely stores, rotates, and manages developer secrets with zero-knowledge architecture.',
        tags: ['Node.js', 'Express.js', 'RelayMail', 'MongoDB', 'Cache'],
        gradient: 'from-orange-500 to-red-500',
        accent: 'orange-500',
        hoverBorder: 'group-hover:border-orange-500/50',
        link: 'https://anarchkey.vercel.app',
    },
    {
        title: 'MindVault',
        category: 'AI Platform',
        description: 'Personalized learning path generator using LLMs. Features automated content synthesis, progress tracking, and adaptive quizzes.',
        tags: ['Node.js', 'MongoDB', 'Ollama', 'express.js'],
        gradient: 'from-purple-500 to-blue-500',
        accent: 'purple-500',
        hoverBorder: 'group-hover:border-purple-500/50',
        link: 'https://github.com/AkiTheMemeGod/MindVault',
    },
    {
        title: 'ProtoBase',
        category: 'DevTools',
        description: 'Backend-as-a-Service that automates database provisioning and API endpoint generation, reducing setup time by 50%.',
        tags: ['Python', 'Flask', 'SQL', 'HTML', 'CSS', 'JS'],
        gradient: 'from-emerald-500 to-teal-500',
        accent: 'emerald-500',
        hoverBorder: 'group-hover:border-emerald-500/50',
        link: 'https://protobase.pythonanywhere.com',
    }
];

export function Projects() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const titleRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.project-card');

            // Allow vertical scrolling to scrub through the cards
            // Pin the section for the duration of the scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    start: "top top",
                    end: `+=${projects.length * 100}%`, // Scroll distance proportional to items
                    scrub: 1,
                }
            });

            // Animate cards sliding in from the right
            cards.forEach((card, index) => {
                if (index > 0) { // First card is already visible
                    tl.fromTo(card,
                        { xPercent: 100, x: 100, opacity: 0 },
                        { xPercent: 0, x: 0, opacity: 1, duration: 1, ease: "power2.out" } // Slightly overlapping or sequential
                    );
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="work" className="relative h-screen w-full bg-black overflow-hidden flex flex-col justify-center items-center">

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            </div>

            {/* Sticky Header */}
            <div ref={titleRef} className="absolute top-12 z-50 text-center w-full">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                    Selected Works
                </h2>
                <p className="text-white/60 text-sm tracking-widest uppercase mt-2 font-medium drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                    Engineering & Design
                </p>
            </div>

            {/* Card Container */}
            <div ref={containerRef} className="relative w-full max-w-7xl h-[600px] flex items-center justify-center px-6">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card absolute top-0 left-0 w-full h-full flex items-center justify-center px-4 md:px-0"
                        style={{ zIndex: index + 1 }} // Ensure proper stacking order
                    >
                        <ProjectCard project={project} index={index} />
                    </div>
                ))}
            </div>

        </section>
    );
}

function ProjectCard({ project, index }) {
    const cardRef = useRef(null);
    const glowRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current || !glowRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Spotlight Glow
        glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 80%)`;
    };

    const handleMouseLeave = () => {
        if (glowRef.current) {
            glowRef.current.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0), transparent 100%)`;
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative w-full max-w-6xl h-[500px] md:h-[600px] rounded-3xl bg-[#0a0a0a] border border-white/10 overflow-hidden transition-all duration-500 shadow-2xl ${project.hoverBorder}`}
        >
            {/* Spotlight Glow Layer */}
            <div
                ref={glowRef}
                className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
            />

            {/* 3D-ish Orbital Graphic Background */}
            <OrbitalGraphics gradient={project.gradient} accent={project.accent} />

            {/* Content Container */}
            <div className="relative z-20 w-full h-full p-8 md:p-16 flex flex-col justify-between">

                {/* Top: Header */}
                <div className="flex justify-between items-start">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full bg-${project.accent} animate-pulse shadow-[0_0_10px_currentColor]`} />
                            <span className={`text-xs font-mono uppercase tracking-widest text-${project.accent}`}>{project.category}</span>
                        </div>
                        <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                            {project.title}
                        </h3>
                    </div>

                    {/* External Link Icon */}
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 cursor-pointer"
                    >
                        <ArrowUpRight className="w-8 h-8" />
                    </a>
                </div>

                {/* Bottom: Description & Tags */}
                <div className="space-y-8 max-w-3xl">
                    <p className="text-xl md:text-2xl text-white font-light leading-relaxed drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-4 py-2 text-sm font-mono text-white/80 bg-white/5 border border-white/10 rounded-lg hover:border-white/30 transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

// 3D Orbital Vector Graphic (~2 Squares revolving around a circle)
function OrbitalGraphics({ gradient, accent }) {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Base Gradient Wash - Increased Opacity */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />

            {/* Centered 3D Scene */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-40">

                {/* Central Circle (Star/Core) */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-${accent} shadow-[0_0_50px_currentColor] text-${accent}`} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/10 blur-xl" />

                {/* Orbital Square 1 */}
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-${accent}/50 shadow-[0_0_15px_currentColor] text-${accent}`}
                        style={{ transform: 'rotateX(70deg) rotateY(12deg)' }} />
                </div>

                {/* Orbital Square 2 (Opposite Axis) */}
                <div className="absolute inset-0 animate-[spin_25s_linear_infinite_reverse]">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-dashed border-${accent}/50 text-${accent}`}
                        style={{ transform: 'rotateX(70deg) rotateY(-12deg)' }} />
                </div>

                {/* Floating Particles/Stars */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-white/50 rounded-full animate-pulse delay-700" />

            </div>
        </div>
    );
}
