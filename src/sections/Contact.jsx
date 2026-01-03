import React, { useRef, useState, useEffect } from 'react';
import { Copy, Check, Github, Linkedin, ArrowUpRight, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section id="contact" className="relative min-h-[80vh] w-full flex items-center justify-center px-6 bg-black">

            <div className="w-full max-w-4xl">
                {/* Header - TechnoBlade Tribute */}
                <div className="mb-20 text-center space-y-6">
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 pb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        Gimme a call? Maybe not. Let's stick to online.
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

                    <div className="relative z-20 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">

                        {/* Interactive Cyber Email Component */}
                        <CyberEmail />

                        <div className="flex items-center gap-4">
                            {[
                                {
                                    name: 'GitHub',
                                    url: 'https://github.com/AkiTheMemeGod',
                                    icon: Github
                                },
                                {
                                    name: 'LinkedIn',
                                    url: 'https://linkedin.com/in/akash-k19052022',
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

                {/* Footer */}
                <div className="mt-20 text-center">
                    <p className="text-neutral-600 font-mono text-sm">
                        built by a nerd.
                    </p>
                </div>

            </div>
        </section>
    );
}

// Cyberpunk Decrypting Email Component
function CyberEmail() {
    const [display, setDisplay] = useState('REVEAL_EMAIL');
    const [copied, setCopied] = useState(false);
    const emailParts = ['k.akashkumar', 'gmail.com']; // Split to foil simple scrapers
    const realEmail = emailParts.join('@');

    const intervalRef = useRef(null);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*';

    const scramble = () => {
        let iteration = 0;
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplay(prev =>
                realEmail
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) return realEmail[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= realEmail.length) {
                clearInterval(intervalRef.current);
            }

            iteration += 1 / 2; // Speed of decryption
        }, 30);
    };

    const reset = () => {
        clearInterval(intervalRef.current);
        setDisplay('REVEAL_EMAIL');
        setCopied(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(realEmail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            onMouseEnter={scramble}
            onMouseLeave={reset}
            onClick={handleCopy}
            className="group/email flex items-center gap-6 cursor-pointer"
        >
            <div className="p-5 rounded-full bg-white/5 border border-white/10 group-hover/email:bg-white group-hover/email:text-black transition-all duration-300">
                {copied ? <Check className="w-8 h-8" /> : <Mail className="w-8 h-8 text-neutral-400 group-hover/email:text-black transition-colors" />}
            </div>

            <div className="text-left">
                <p className="text-neutral-500 text-xs font-mono tracking-widest uppercase mb-2">
                    {copied ? 'COPIED TO CLIPBOARD' : 'SECURE CHANNEL'}
                </p>
                <span className={`text-2xl md:text-3xl font-bold tracking-tight break-all font-mono transition-colors ${copied ? 'text-green-400' : 'text-white'}`}>
                    {display}
                </span>
            </div>
        </div>
    );
}
