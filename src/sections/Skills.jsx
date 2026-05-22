import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
    {
        title: 'Core & Languages',
        tag: 'LANG.SYS',
        skills: [
            { name: 'Python', icon: 'https://cdn.simpleicons.org/python/ffffff' },
            { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/ffffff' },
            { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/ffffff' },
            { name: 'C', icon: 'https://cdn.simpleicons.org/c/ffffff' },
            { name: 'SQL', icon: 'https://cdn.simpleicons.org/mysql/ffffff' },
            { name: 'Bash', icon: 'https://cdn.simpleicons.org/gnubash/ffffff' },
            { name: 'Git', icon: 'https://cdn.simpleicons.org/git/ffffff' },
        ]
    },
    {
        title: 'Systems & Infrastructure',
        tag: 'INFRA.SEC',
        skills: [
            { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/ffffff' },
            { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/ffffff' },
            { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/ffffff' },
            { name: 'Kali Linux', icon: 'https://cdn.simpleicons.org/kalilinux/ffffff' },
            { name: 'Ollama', icon: 'https://cdn.simpleicons.org/ollama/ffffff' },
            { name: 'MCP Servers', icon: 'https://cdn.simpleicons.org/anthropic/ffffff' },
            { name: 'Raspberry Pi', icon: 'https://cdn.simpleicons.org/raspberrypi/ffffff' },
        ]
    },
    {
        title: 'Backend & Data',
        tag: 'DB.BACKEND',
        skills: [
            { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/ffffff' },
            { name: 'Express', icon: 'https://cdn.simpleicons.org/express/ffffff' },
            { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/ffffff' },
            { name: 'Flask', icon: 'https://cdn.simpleicons.org/flask/ffffff' },
            { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/ffffff' },
            { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/ffffff' },
            { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/ffffff' },
        ]
    }
];

export function Skills() {
    const containerRef = useRef(null);

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    };

    return (
        <section 
            id="skills" 
            ref={containerRef} 
            className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 bg-black bg-grid px-6 md:px-20"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />

            <div className="z-10 mb-20 text-center">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                    [ TECH STACK ]
                </span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-2">
                    THE ARSENAL
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl w-full relative z-10">
                {skillCategories.map((category, index) => (
                    <CategoryCard 
                        key={category.title} 
                        category={category} 
                        index={index} 
                        variants={cardVariants}
                    />
                ))}
            </div>
        </section>
    );
}

function CategoryCard({ category, index, variants }) {
    return (
        <motion.div
            custom={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="p-8 bg-zinc-950/40 border border-white/5 rounded-2xl flex flex-col justify-start space-y-6"
        >
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-lg font-medium text-white tracking-wide">
                    {category.title}
                </h3>
                <span className="font-mono text-[10px] text-zinc-500 tracking-widest">
                    //{category.tag}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                    <SkillTile key={skill.name} skill={skill} />
                ))}
            </div>
        </motion.div>
    );
}

function SkillTile({ skill }) {
    const tileRef = useRef(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = tileRef.current.getBoundingClientRect();
        setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={tileRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex items-center gap-3 p-3 bg-zinc-900/30 hover:bg-zinc-900/60 border border-white/5 hover:border-white/10 rounded-xl transition-all duration-300 overflow-hidden group cursor-default"
        >
            {/* Spotlight cursor glow overlay */}
            {isHovered && (
                <div 
                    className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(70px circle at ${coords.x}px ${coords.y}px, rgba(239, 68, 68, 0.08), transparent 80%)`
                    }}
                />
            )}

            <img
                src={skill.icon}
                alt={skill.name}
                className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 filter"
            />
            <span className="text-xs font-light text-zinc-400 group-hover:text-zinc-200 transition-colors font-mono">
                {skill.name}
            </span>
        </div>
    );
}
