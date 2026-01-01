import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'Relay Mail',
        category: 'Infrastructure',
        description: 'High-performance, reliable email delivery service designed as a drop-in replacement for legacy SMTP. Features real-time analytics, webhook events, and 99.99% uptime SLA.',
        tags: ['Node.js', 'Redis', 'Resend', 'Postgres'],
        gradient: 'from-pink-500/20 to-rose-500/20',
        hoverBorder: 'group-hover:border-pink-500/50',
    },
    {
        title: 'AnarchKey',
        category: 'Security',
        description: 'Military-grade encrypted cloud API key manager. Securely stores, rotates, and manages developer secrets with zero-knowledge architecture.',
        tags: ['Rust', 'WASM', 'Cryptography'],
        gradient: 'from-orange-500/20 to-red-500/20',
        hoverBorder: 'group-hover:border-orange-500/50',
    },
    {
        title: 'MindVault',
        category: 'AI Platform',
        description: 'Personalized learning path generator using LLMs. Features automated content synthesis, progress tracking, and adaptive quizzes.',
        tags: ['Next.js', 'Python', 'OpenAI'],
        gradient: 'from-purple-500/20 to-blue-500/20',
        hoverBorder: 'group-hover:border-purple-500/50',
    },
    {
        title: 'ProtoBase',
        category: 'DevTools',
        description: 'Backend-as-a-Service that automates database provisioning and API endpoint generation, reducing setup time by 50%.',
        tags: ['Go', 'Docker', 'SQL'],
        gradient: 'from-emerald-500/20 to-teal-500/20',
        hoverBorder: 'group-hover:border-emerald-500/50',
    }
];

export function Projects() {
    const containerRef = useRef(null);

    return (
        <section id="work" ref={containerRef} className="relative min-h-screen w-full py-32 bg-black px-6 md:px-20 overflow-hidden">

            {/* Header */}
            <div className="relative z-10 mb-20 text-center">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">Selected Works</h2>
                <p className="text-white/40 text-sm tracking-widest uppercase mt-2">Engineering & Design</p>
            </div>

            {/* Vertical Project Stack */}
            <div className="flex flex-col items-center gap-16 md:gap-32 w-full max-w-7xl mx-auto">
                {projects.map((project, index) => (
                    <TiltCard key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}

function TiltCard({ project, index }) {
    const cardRef = useRef(null);
    const contentRef = useRef(null);
    const glowRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Tilt Math: Rotate based on distance from center
        // Max tilt: 10 degrees
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        // Apply Tilt
        gsap.to(cardRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
        });

        // Parallax Content (Moves slightly opposite or more extreme)
        gsap.to(contentRef.current, {
            x: (x - centerX) / 20,
            y: (y - centerY) / 20,
            duration: 0.4,
            ease: "power2.out"
        });

        // Spotlight Glow Position
        if (glowRef.current) {
            glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 80%)`;
        }
    };

    const handleMouseLeave = () => {
        // Reset
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
        });

        gsap.to(contentRef.current, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
        });

        if (glowRef.current) {
            glowRef.current.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0), transparent 100%)`;
        }
    };

    // Scroll Reveal
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardRef.current,
                { opacity: 0, y: 100, rotateX: 20 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <div
            style={{ perspective: '1000px' }}
            className="w-full h-[500px] md:h-[600px] group"
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`relative w-full h-full rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden transition-colors duration-500 ${project.hoverBorder}`}
                style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    outline: '1px solid transparent',
                    willChange: 'transform'
                }}
            >
                {/* Spotlight Glow Layer */}
                <div
                    ref={glowRef}
                    className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
                />

                {/* Ambient Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

                {/* Content Container (Parallax) */}
                <div
                    ref={contentRef}
                    className="relative z-20 w-full h-full p-8 md:p-16 flex flex-col justify-between"
                    style={{ transform: 'translateZ(50px)' }}
                >
                    {/* Top: Header */}
                    <div className="flex justify-between items-start">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full bg-white opacity-50 animate-pulse`} />
                                <span className="text-xs font-mono uppercase tracking-widest text-white/50">{project.category}</span>
                            </div>
                            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300">
                                {project.title}
                            </h3>
                        </div>

                        {/* External Link Icon */}
                        <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-white text-white group-hover:text-black transition-all duration-300 rotate-45 group-hover:rotate-0">
                            <ArrowUpRight className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Middle/Bottom: Description & Tags */}
                    <div className="space-y-8 max-w-2xl">
                        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 text-xs font-mono text-white/60 bg-white/5 border border-white/10 rounded-lg group-hover:border-white/30 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Floating Elements (Visual Decoration) */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500" style={{ transform: 'translateZ(-20px)' }} />

            </div>
        </div>
    );
}
