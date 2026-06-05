import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Glasses, Linkedin } from 'lucide-react';

function SocialButton({ href, icon: Icon, label, delay = 0 }) {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex items-center gap-3 overflow-hidden border border-white/15 px-5 py-4 w-[160px] md:w-[180px] group cursor-pointer"
            style={{ background: 'transparent' }}
        >
            {/* fill wipe from bottom */}
            <motion.span
                className="absolute inset-0 bg-white pointer-events-none"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: hovered ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ originY: '100%' }}
            />
            {/* icon */}
            <motion.span
                animate={{ y: hovered ? -2 : 0, color: hovered ? '#000' : 'rgba(255,255,255,0.7)' }}
                transition={{ duration: 0.25 }}
                className="relative z-10"
            >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
            </motion.span>
            {/* label */}
            <motion.span
                animate={{ x: hovered ? 2 : 0, color: hovered ? '#000' : 'rgba(255,255,255,0.55)' }}
                transition={{ duration: 0.25 }}
                className="relative z-10 font-mono text-[11px] uppercase tracking-[0.25em]"
            >
                {label}
            </motion.span>
            {/* arrow hint */}
            <motion.span
                animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0, color: '#000' }}
                transition={{ duration: 0.25 }}
                className="relative z-10 ml-auto font-mono text-[10px]"
            >
                ↗
            </motion.span>
        </motion.a>
    );
}

function useCountUp(target, duration = 1400, delay = 0) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = null;
        let raf;
        const timeout = setTimeout(() => {
            const step = (ts) => {
                if (!start) start = ts;
                const progress = Math.min((ts - start) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(ease * target));
                if (progress < 1) raf = requestAnimationFrame(step);
                else setCount(target);
            };
            raf = requestAnimationFrame(step);
        }, delay);
        return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
    }, [target, duration, delay]);
    return count;
}

function InfoPanel() {
    const years  = useCountUp(3, 1200, 800);
    const projects = useCountUp(20, 1400, 1000);
    const [linesIn, setLinesIn] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setLinesIn(true), 400);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="flex flex-col gap-0 select-none">

            {/* Role block — big stacked text */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6"
            >
                <p className="font-mono text-[9px] tracking-[0.4em] text-white/30 uppercase mb-2">Discipline</p>
                <div className="flex flex-col gap-1">
                    {['Full-Stack', 'Engineer &', 'Secure Systems'].map((word, i) => (
                        <motion.span
                            key={word}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="text-white font-bold leading-[1] tracking-tight"
                            style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)' }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Diagonal rule */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="origin-left h-px bg-gradient-to-r from-white/50 via-white/20 to-transparent mb-6"
            />

            {/* Stats row */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="grid grid-cols-2 gap-4 mb-6"
            >
                <div className="flex flex-col">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase mb-1">Exp</span>
                    <span className="font-bold text-white leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                        {years}<span className="text-white/40 text-base font-light">yr</span>
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase mb-1">Projects</span>
                    <span className="font-bold text-white leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                        {projects}<span className="text-white/40 text-base font-light">+</span>
                    </span>
                </div>
            </motion.div>

            {/* Stack tags — horizontal flowing */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.25, duration: 0.5 }}
                className="flex flex-wrap gap-1.5 mb-6"
            >
                {['Backend', 'Distributed', 'Containers', 'Local AI'].map((tag) => (
                    <span key={tag} className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50 border border-white/10 px-2 py-1 hover:border-white/30 hover:text-white/80 transition-all duration-200">
                        {tag}
                    </span>
                ))}
            </motion.div>

            {/* Status dot */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="flex items-center gap-2 pt-3 border-t border-white/10"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">Available</span>
            </motion.div>
        </div>
    );
}

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
            className="page-scene relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black"
        >
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,255,255,0.07),transparent_70%),linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.1)_40%,rgba(0,0,0,0.55)_100%)]" />
                <div className="absolute inset-0 bg-grid opacity-[0.28]" />
            </div>

            {/* Name behind the image — z-10 */}
            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none pb-[38%] md:pb-[34%] lg:pb-[36%]"
            >
                <div className="overflow-hidden py-2">
                    <motion.h1
                        variants={titleVariants}
                        className="text-white text-[6rem] font-bold leading-[0.85] tracking-tighter sm:text-[10rem] md:text-[15rem] lg:text-[18rem]"
                    >
                        Akash K.
                    </motion.h1>
                </div>
            </motion.div>

            {/* Photo with transparent bg — z-20 */}
            <div className="absolute top-0 left-0 h-full w-full z-20 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="relative w-full h-full"
                >
                    <motion.img
                        style={{ y: imageY, scale: imageScale }}
                        src="/me_nobg.png"
                        alt="Akash K. - Full-Stack Engineer and Secure Systems Specialist with 3+ years experience"
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-contain object-bottom grayscale contrast-[1.15] brightness-[1.1] saturate-0"
                    />
                </motion.div>
            </div>

            {/* Social buttons — left edge, z-30 */}
            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 pointer-events-auto"
            >
                <SocialButton href="https://github.com/AkiTheMemeGod" icon={Github} label="GitHub" delay={1.0} />
                <SocialButton href="https://www.linkedin.com/in/akash-k19052022/" icon={Linkedin} label="LinkedIn" delay={1.15} />
                <SocialButton href="https://bytheseus.me" icon={Glasses} label="Projects" delay={1.30} />
            </motion.div>

            {/* Info panel — z-30 */}
            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 z-30 w-[200px] md:w-[260px] pointer-events-auto"
            >
                <InfoPanel />
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40 flex-col"
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
