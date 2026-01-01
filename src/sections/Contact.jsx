import React, { useRef, useState, useEffect } from 'react';
import { Copy, Check, Github, Linkedin, ArrowUpRight } from 'lucide-react';

export function Contact() {
    const cardRef = useRef(null);
    const [isCopied, setIsCopied] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const copyEmail = () => {
        navigator.clipboard.writeText('hello@akashk.dev');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <section id="contact" className="relative min-h-[80vh] w-full flex items-center justify-center px-6 bg-black">

            <div className="w-full max-w-4xl">
                {/* Header - TechnoBlade Tribute */}
                <div className="mb-20 text-center space-y-6">
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/30 pb-4">
                        Gimme a call? Maybe not Lets stick to online.
                    </h2>
                    <p className="text-neutral-500 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
                        I have the tools. You have the vision. Let's conquer.
                    </p>
                </div>

                {/* The Obsidian Slab */}
                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    className="group relative w-full rounded-3xl bg-neutral-950 border border-neutral-900 overflow-hidden"
                >
                    {/* Spotlight Effect - Texture Reveal */}
                    <div
                        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
                        }}
                    />

                    {/* Spotlight Effect - Border Highlight */}
                    <div
                        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                        style={{
                            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                            maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
                            maskClip: 'content-box, border-box',
                            maskComposite: 'exclude',
                            WebkitMaskComposite: 'xor',
                            padding: '1px'
                        }}
                    />

                    <div className="relative z-20 p-8 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
                        <div>
                            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-4 block">
                                Initiate contact
                            </span>
                            <div
                                onClick={copyEmail}
                                className="group/email flex items-center gap-4 text-2xl md:text-4xl font-semibold text-white cursor-pointer transition-colors"
                            >
                                <span className="group-hover/email:text-neutral-300 transition-colors">hello@akashk.dev</span>
                                <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                    {isCopied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5 text-neutral-400 group-hover/email:text-white" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {[
                                {
                                    name: 'GitHub',
                                    url: 'https://github.com/akashk-dev',
                                    icon: Github
                                },
                                {
                                    name: 'LinkedIn',
                                    url: 'https://linkedin.com/in/akashk-dev',
                                    icon: Linkedin
                                }
                            ].map(social => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group/icon"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-6 h-6 text-neutral-400 group-hover/icon:text-white transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-[-5deg]" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-20 flex justify-between items-center text-xs font-mono text-neutral-700 uppercase tracking-widest border-t border-neutral-900 pt-8">
                    <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} IST</span>
                    <span className="animate-pulse text-white/50">built by a nerd.</span>
                </div>

            </div>
        </section>
    );
}
