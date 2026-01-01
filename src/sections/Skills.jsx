import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

// Extended Skills List (~24 items)
const skills = [
    // Row 1: The Core & Languages
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python/ffffff' },
    { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/ffffff' },
    { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/ffffff' },
    { name: 'C', icon: 'https://cdn.simpleicons.org/c/ffffff' },
    { name: 'pypi', icon: 'https://cdn.simpleicons.org/pypi/5C3EE8' },
    { name: 'SQL', icon: 'https://cdn.simpleicons.org/mysql/ffffff' },
    { name: 'Bash', icon: 'https://cdn.simpleicons.org/gnubash/ffffff' },
    { name: 'Git', icon: 'https://cdn.simpleicons.org/git/f05032' },

    // Row 2: AI, LLMs & Hardware (Offset Row)
    { name: 'Ollama', icon: 'https://cdn.simpleicons.org/ollama/ffffff' },
    { name: 'Open LLMs', icon: 'https://cdn.simpleicons.org/huggingface/ffffff' },
    { name: 'MCP Servers', icon: 'https://cdn.simpleicons.org/anthropic/ffffff' },
    { name: 'Raspberry Pi', icon: 'https://cdn.simpleicons.org/raspberrypi/C51A4A' },
    { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/ffffff' },
    { name: 'Kali', icon: 'https://cdn.simpleicons.org/kalilinux/ffffff' },
    { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ed' },
    { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/326ce5' },

    // Row 3: Backend & Full Stack
    { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/ffffff' },
    { name: 'npm', icon: 'https://cdn.simpleicons.org/npm/0063F7' },
    { name: 'Express', icon: 'https://cdn.simpleicons.org/express/ffffff' },
    { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/ffffff' },
    { name: 'Flask', icon: 'https://cdn.simpleicons.org/flask/ffffff' },
    { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/ffffff' },
    { name: 'Mongo', icon: 'https://cdn.simpleicons.org/mongodb/47a248' },
    { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
];

export function Skills() {
    const containerRef = useRef(null);
    const wallRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const bricks = wallRef.current.querySelectorAll('.skill-brick');

            gsap.fromTo(bricks,
                { opacity: 0, scale: 0.5, y: 50 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: {
                        amount: 1,
                        grid: "auto",
                        from: "center"
                    },
                    ease: "back.out(1.5)",
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

    // Split skills into 3 chunks for the geometric brick wall
    const chunkSize = Math.ceil(skills.length / 3);
    const row1 = skills.slice(0, chunkSize);
    const row2 = skills.slice(chunkSize, chunkSize * 2);
    const row3 = skills.slice(chunkSize * 2);

    const Brick = ({ skill }) => (
        <div className="skill-brick group relative flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-white/5 border border-white/5 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-110 hover:z-20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-default">
            {/* Icon */}
            <img
                src={skill.icon}
                alt={skill.name}
                className="w-10 h-10 md:w-12 md:h-12 transition-all duration-500 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100"
            />
            {/* Label */}
            <span className="absolute bottom-2 text-[10px] font-medium text-white/40 uppercase opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-center w-full">
                {skill.name}
            </span>
        </div>
    );

    return (
        <section id="skills" ref={containerRef} className="relative min-h-[60vh] w-full flex flex-col items-center justify-center py-32 bg-black px-4 overflow-hidden">

            <div className="z-10 mb-20 text-center">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white">The Arsenal</h2>
                <p className="text-white/40 text-sm tracking-widest uppercase mt-2">Core Technologies</p>
            </div>

            {/* The Brick Wall */}
            <div ref={wallRef} className="flex flex-col gap-4 md:gap-6 items-center w-full max-w-7xl perspective-[1000px]">

                {/* Row 1: Standard */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full">
                    {row1.map(skill => <Brick key={skill.name} skill={skill} />)}
                </div>

                {/* Row 2: Offset (The "Brick" Effect) */}
                {/* We use padding or margin to visually shift this row on desktop */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full md:pl-16">
                    {row2.map(skill => <Brick key={skill.name} skill={skill} />)}
                </div>

                {/* Row 3: Standard (or Counter-Offset if needed, sticking to centered for balance) */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full">
                    {row3.map(skill => <Brick key={skill.name} skill={skill} />)}
                </div>

            </div>

        </section>
    );
}
