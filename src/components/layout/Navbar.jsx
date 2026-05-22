import React, { useRef } from 'react';
import { Home, User, Code, FolderGit2, History, Mail, FileText, PenBox } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

const navItems = [
    { name: 'Home', icon: Home, href: '/#hero', type: 'hash' },
    { name: 'About', icon: User, href: '/#about', type: 'hash' },
    { name: 'Skills', icon: Code, href: '/#skills', type: 'hash' },
    { name: 'Work', icon: FolderGit2, href: '/#work', type: 'hash' },
    { name: 'Journey', icon: History, href: '/#experience', type: 'hash' },
    { name: 'Blogs', icon: PenBox, href: '/blog', type: 'internal' },
    { name: 'Resume', icon: FileText, href: '/resume', type: 'internal' },
    { name: 'Contact', icon: Mail, href: '/#contact', type: 'hash' },
];

export function Navbar() {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const mouseX = useMotionValue(Infinity);
    const mouseY = useMotionValue(Infinity);
    const reduceMotion = useReducedMotion();

    const navVariants = {
        hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.8,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.04,
            },
        },
    };

    return (
        <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
        >
            <div
                onMouseMove={(e) => {
                    mouseX.set(e.clientX);
                    mouseY.set(e.clientY);
                }}
                onMouseLeave={() => {
                    mouseX.set(Infinity);
                    mouseY.set(Infinity);
                }}
                className="relative isolate inline-flex items-center gap-1 rounded-full border border-white/10 bg-zinc-950/75 px-2 py-2 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
            >
                {navItems.map((item) => {
                    const sectionHash = item.href.startsWith('/#') ? `#${item.href.slice(2)}` : '';
                    const isHomeItem = item.name === 'Home';
                    const isActive =
                        (item.href === '/blog' && location.pathname.startsWith('/blog')) ||
                        (item.href === '/resume' && location.pathname.startsWith('/resume')) ||
                        (isHome && isHomeItem && (!location.hash || location.hash === '#hero')) ||
                        (isHome && item.type === 'hash' && location.hash === sectionHash);

                    return (
                        <NavItem
                            key={item.name}
                            item={item}
                            isActive={isActive}
                            isHome={isHome}
                            mouseX={mouseX}
                            mouseY={mouseY}
                            reduceMotion={reduceMotion}
                        />
                    );
                })}
            </div>
        </motion.nav>
    );
}

function NavItem({ item, isActive, isHome, mouseX, mouseY, reduceMotion }) {
    const ref = useRef(null);

    const pullX = useSpring(
        useTransform(mouseX, (value) => {
            const bounds = ref.current?.getBoundingClientRect();

            if (!bounds || reduceMotion || !Number.isFinite(value)) {
                return 0;
            }

            const centerX = bounds.left + bounds.width / 2;
            return Math.max(-4, Math.min(4, (value - centerX) * 0.08));
        }),
        { mass: 0.15, stiffness: 220, damping: 20 }
    );

    const pullY = useSpring(
        useTransform(mouseY, (value) => {
            const bounds = ref.current?.getBoundingClientRect();

            if (!bounds || reduceMotion || !Number.isFinite(value)) {
                return 0;
            }

            const centerY = bounds.top + bounds.height / 2;
            return Math.max(-3, Math.min(3, (value - centerY) * 0.05));
        }),
        { mass: 0.15, stiffness: 220, damping: 20 }
    );

    const isHashLink = item.type === 'hash';
    const targetHash = item.href.startsWith('/#') ? `#${item.href.slice(2)}` : item.href;

    let Component = Link;
    let props = { to: item.href };

    if (isHashLink && isHome) {
        Component = 'a';
        props = { href: targetHash || '#' };
    }

    return (
        <Component {...props} className="relative group">
            <motion.div
                ref={ref}
                style={{ x: pullX, y: pullY }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="magnetic-item relative flex h-12 w-12 items-center justify-center rounded-full border border-white/5 bg-zinc-900/35 text-zinc-400 transition-colors duration-300 hover:border-white/12 hover:bg-zinc-900/70 hover:text-white"
            >
                <span
                    className={`absolute inset-x-3 bottom-1 h-px rounded-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}`}
                />

                <motion.div className="relative z-10 flex items-center justify-center">
                    <item.icon className="h-[18px] w-[18px]" />
                </motion.div>

                <span
                    className={`absolute -bottom-0.5 h-1 w-1 rounded-full bg-red-400 shadow-[0_0_18px_rgba(248,113,113,0.85)] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                />

                <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-95 translate-y-1 origin-bottom rounded-full border border-white/8 bg-zinc-950/95 px-3 py-1.5 text-[10px] font-mono tracking-[0.24em] text-zinc-200 opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.name}
                </span>
            </motion.div>
        </Component>
    );
}