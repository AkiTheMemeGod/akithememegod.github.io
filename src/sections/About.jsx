import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, Terminal } from 'lucide-react';

const principles = [
    {
        id: '01',
        title: 'Deterministic Architecture',
        icon: Cpu,
        desc: 'Constructing robust structures that scale predictably. I value system isolation, clean separation of concerns, and defensive coding patterns that make long-term maintenance straightforward.',
        accent: 'text-red-500',
        bg: 'group-hover:bg-red-500/5'
    },
    {
        id: '02',
        title: 'Security & Sandbox Isolation',
        icon: Shield,
        desc: 'Developing software under the assumption of hostile network environments. I integrate containerized security, sandboxing, and strict identity policies across all architecture layers.',
        accent: 'text-cyan-500',
        bg: 'group-hover:bg-cyan-500/5'
    },
    {
        id: '03',
        title: 'Tooling & Workflow Automation',
        icon: Terminal,
        desc: 'Building custom scripts, CLI utilities, and CI/CD runners to speed up local loops. I believe developer environment optimization is essential for writing high-quality code.',
        accent: 'text-purple-500',
        bg: 'group-hover:bg-purple-500/5'
    }
];

export function About() {
    const containerRef = useRef(null);

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    return (
        <section 
            id="about" 
            ref={containerRef} 
            className="relative min-h-screen py-32 w-full flex items-center justify-center px-6 md:px-20 bg-black bg-grid"
        >
            {/* Background mask to fade grid near section edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-0" />

            <div className="max-w-7xl w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    
                    {/* Left Sticky Column */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                        className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-32 h-fit space-y-6"
                    >
                        <div className="space-y-2">
                            <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                                [ IDENTITY & OUTLINE ]
                            </span>
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                                BEHIND THE TERMINAL
                            </h2>
                        </div>
                        <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed tracking-wide">
                            I am a developer who believes in engineering software systems with high standards of craft. Rather than deploying black boxes, I design transparent, highly testable code bases that are performant and secure under pressure. 
                        </p>
                        <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed tracking-wide">
                            My domain ranges from setting up declarative container topologies and local large language models to writing modular frontends with fine layouts.
                        </p>
                    </motion.div>

                    {/* Right Column: Ledger stack */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="lg:col-span-7 space-y-6"
                    >
                        {principles.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={fadeUp}
                                className="group relative p-8 bg-zinc-950/40 border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                            >
                                {/* Light dynamic glow on hover */}
                                <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none ${item.bg}`} />
                                
                                <div className="flex items-start justify-between gap-6 relative z-10">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg bg-zinc-900 border border-white/5 ${item.accent}`}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-lg md:text-xl font-medium text-white tracking-wide">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-light font-sans">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <span className="font-mono text-xs text-zinc-600 tracking-wider">
                                        [{item.id}]
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
