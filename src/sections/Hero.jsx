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
            className="relative min-h-screen w-full flex items-center justify-between px-6 md:px-20 overflow-hidden bg-black bg-grid"
        >
            {/* Background Radial Shade to limit grid visibility */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(239,68,68,0.03),transparent_40%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(6,182,212,0.03),transparent_40%)]" />
            </div>

            {/* Image Side (Left) - Floating Parallax with shutter reveal */}
            <div className="absolute top-0 left-0 h-full w-full md:w-1/2 z-10 pointer-events-none mix-blend-screen">
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
                        className="w-full h-full object-cover object-center md:object-[right_center] filter grayscale contrast-125 brightness-90"
                    />

                    {/* Technical HUD Overlay Grid lines inside image container */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,255,0.03),rgba(0,0,255,0.03))] bg-[length:100%_4px,6px_100%] pointer-events-none opacity-20" />

                    {/* Gradient Masks for blending */}
                    <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-40" />
                </motion.div>
            </div>

            {/* Content Side (Right) */}
            <motion.div 
                style={{ y: textY, opacity: textOpacity }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20 flex flex-col items-end max-w-4xl pt-20 ml-auto text-right"
            >
                {/* Technical serial node prefix */}
                <motion.div 
                    variants={elementVariants}
                    className="flex items-center gap-2 mb-2 font-mono text-[10px] tracking-[0.25em] text-red-500 uppercase"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    NODE // AK.SYS.ONLINE
                </motion.div>

                {/* Massive Typography Name Reveal */}
                <div className="overflow-hidden py-2">
                    <motion.h1 
                        variants={titleVariants}
                        className="text-[4.5rem] sm:text-[7rem] md:text-[11rem] lg:text-[13rem] leading-[0.85] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-50 via-zinc-200 to-zinc-600"
                    >
                        Akash K.
                    </motion.h1>
                </div>

                {/* Technical Meta & Role Description */}
                <motion.div 
                    variants={elementVariants}
                    className="mt-6 md:mt-8 space-y-5 pr-4 border-r border-red-500/20"
                >
                    <div className="space-y-3">
                        <h2 className="text-lg md:text-xl font-mono font-medium text-red-500/90 tracking-wider">
                            FULL-STACK ENGINEER & SECURE SYSTEMS DEVELOPER
                        </h2>
                        <p className="text-zinc-400 text-xs md:text-sm max-w-md font-light tracking-wide leading-relaxed ml-auto">
                            Building resilient backend services, distributed systems, and modern frontends. Specializing in container orchestrations, containerized web servers, and local AI solutions.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-end gap-5 pt-1">
                        <a
                            href="https://github.com/AkiTheMemeGod"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white transition-colors duration-300 transform hover:scale-105"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/akash-k19052022/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-500 hover:text-white transition-colors duration-300 transform hover:scale-105"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </motion.div>

            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-10 right-10 flex items-center gap-3 z-20 flex-row-reverse"
            >
                <motion.div 
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-white/5 bg-zinc-950/40 backdrop-blur"
                >
                    <ArrowDown className="w-3.5 h-3.5 text-zinc-400" />
                </motion.div>
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-500">
                    SCROLL TO EXPLORE
                </span>
            </motion.div>

        </section>
    );
}
