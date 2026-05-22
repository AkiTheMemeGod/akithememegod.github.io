import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, Terminal } from 'lucide-react';

const introWords = 'I am a developer who believes in engineering software systems with high standards of craft. Rather than deploying black boxes, I design transparent, highly testable code bases that are performant and secure under pressure.'.split(' ');

const principles = [
    {
        id: '01',
        title: 'Deterministic Architecture',
        icon: Cpu,
        desc: 'Constructing robust structures that scale predictably. I value system isolation, clean separation of concerns, and defensive coding patterns that make long-term maintenance straightforward.',
    },
    {
        id: '02',
        title: 'Security & Sandbox Isolation',
        icon: Shield,
        desc: 'Developing software under the assumption of hostile network environments. I integrate containerized security, sandboxing, and strict identity policies across all architecture layers.',
    },
    {
        id: '03',
        title: 'Tooling & Workflow Automation',
        icon: Terminal,
        desc: 'Building custom scripts, CLI utilities, and CI/CD runners to speed up local loops. I believe developer environment optimization is essential for writing high-quality code.',
    }
];

export function About() {
    const containerRef = useRef(null);

    const wordContainer = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.028 },
        },
    };

    const wordItem = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        },
    };

    const clipCard = {
        hidden: { opacity: 0, y: 18 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
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
            className="page-scene relative min-h-[100dvh] py-32 w-full flex items-center justify-center px-6 md:px-20 bg-black bg-grid"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,1)_100%)] pointer-events-none z-0" />

            <div className="max-w-7xl w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    
                    {/* Left Sticky Column */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={wordContainer}
                        className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-32 h-fit space-y-6"
                    >
                        <div className="space-y-2">
                            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/55">
                                [ IDENTITY & OUTLINE ]
                            </span>
                            <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                                BEHIND THE TERMINAL
                            </h2>
                        </div>
                        <p className="max-w-xl text-sm font-light leading-relaxed tracking-wide text-zinc-300 md:text-base">
                            {introWords.map((word, index) => (
                                <motion.span
                                    key={`${word}-${index}`}
                                    variants={wordItem}
                                    className="inline-block mr-[0.35em]"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </p>
                        <p className="text-xs font-light leading-relaxed tracking-wide text-zinc-500 md:text-sm">
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
                                variants={clipCard}
                                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.05]"
                            >
                                <div className="flex items-start justify-between gap-6 relative z-10">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg border border-white/10 bg-black/30 p-2 text-white">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-lg font-medium tracking-wide text-white md:text-xl">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <p className="font-sans text-xs font-light leading-relaxed text-zinc-300 md:text-sm">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <span className="font-mono text-xs tracking-wider text-white/30">
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
