import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, ArrowDown } from 'lucide-react';

export function Hero() {
    const containerRef = useRef(null);
    
    // Set up scroll-linked parallax values
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const indicatorScale = useTransform(scrollYProgress, [0, 1], [0.22, 1]);

    const titleVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const elementVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <section 
            ref={containerRef} 
            className="page-scene relative min-h-[100dvh] w-full flex items-center justify-between overflow-hidden bg-black px-6 md:px-20"
        >
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_78%_58%,rgba(255,255,255,0.09),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_44%,rgba(0,0,0,0.88)_100%)]" />
                <div className="absolute inset-0 bg-grid opacity-[0.28]" />
            </div>

            <div className="absolute top-0 left-0 h-full w-full md:w-[56%] z-10 pointer-events-none">
                <motion.div 
                    initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", opacity: 0 }}
                    animate={{ clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="relative w-full h-full overflow-hidden"
                >
                    <motion.img
                        style={{ y: imageY, scale: imageScale }}
                        src="/me.png"
                        alt="Akash K."
                        className="w-full h-full object-cover object-center md:object-[right_center] grayscale contrast-[1.4] brightness-[1.08] saturate-0"
                    />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_52%),linear-gradient(90deg,rgba(255,255,255,0.06),transparent_18%,transparent_72%,rgba(0,0,0,0.72))]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.14)_100%)]" />
                </motion.div>
            </div>

            {/* Content Side (Right) */}
            <motion.div 
                style={{ y: textY, opacity: textOpacity }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20 ml-auto flex max-w-4xl flex-col items-end pt-20 text-right"
            >
                <motion.div 
                    variants={elementVariants}
                    className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/65"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.6)] animate-pulse" />
                    NODE // AK.SYS.ONLINE
                </motion.div>

                <div className="overflow-hidden py-2">
                    <motion.h1 
                        variants={titleVariants}
                        className="bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-[4.5rem] font-bold leading-[0.85] tracking-tighter text-transparent sm:text-[7rem] md:text-[11rem] lg:text-[13rem]"
                    >
                        Akash K.
                    </motion.h1>
                </div>

                <motion.div 
                    variants={elementVariants}
                    className="mt-6 space-y-5 border-r border-white/15 pr-4 md:mt-8"
                >
                    <div className="space-y-3">
                        <h2 className="font-mono text-lg font-medium tracking-wider text-white md:text-xl">
                            FULL-STACK ENGINEER & SECURE SYSTEMS DEVELOPER
                        </h2>
                        <p className="ml-auto max-w-md text-xs font-light leading-relaxed tracking-wide text-zinc-300 md:text-sm">
                            Building resilient backend services, distributed systems, and modern frontends. Specializing in container orchestrations, containerized web servers, and local AI solutions.
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-5 pt-1">
                        <a
                            href="https://github.com/AkiTheMemeGod"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 transition-colors duration-300 hover:scale-105 hover:text-white"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/akash-k19052022/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 transition-colors duration-300 hover:scale-105 hover:text-white"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </motion.div>

            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-10 right-10 flex items-center gap-3 z-20 flex-row-reverse"
            >
                <motion.div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur">
                    <ArrowDown className="h-3.5 w-3.5 text-white/70" />
                </motion.div>
                <div className="flex flex-col items-end gap-2">
                    <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/45">
                        SCROLL TO EXPLORE
                    </span>
                    <motion.span
                        style={{ scaleX: indicatorScale }}
                        className="h-px w-32 origin-right bg-gradient-to-l from-white via-white/25 to-transparent"
                    />
                </div>
            </motion.div>

        </section>
    );
}
