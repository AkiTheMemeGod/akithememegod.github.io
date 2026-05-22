import React, { useRef } from 'react';
import { Home, User, Code, FolderGit2, History, Mail, FileText, PenBox } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const navItems = [
    { name: 'Home', icon: Home, href: '/#', type: 'hash' },
    { name: 'About', icon: User, href: '/#about', type: 'hash' },
    { name: 'Skills', icon: Code, href: '/#skills', type: 'hash' },
    { name: 'Work', icon: FolderGit2, href: '/#work', type: 'hash' },
    { name: 'Journey', icon: History, href: '/#experience', type: 'hash' },
    { name: 'Blogs', icon: PenBox, href: '/blog', type: 'internal' },
    { name: 'Resume', icon: FileText, href: '/resume.pdf', external: true },
    { name: 'Contact', icon: Mail, href: '/#contact', type: 'hash' },
];

export function Navbar() {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.nav 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-none"
        >
            <div 
                onMouseMove={(e) => mouseX.set(e.clientX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-end gap-3 px-4 py-3 bg-zinc-950/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl pointer-events-auto"
            >
                {navItems.map((item) => {
                    const isActive =
                        (item.href === '/blog' && location.pathname.startsWith('/blog')) ||
                        (isHome && item.href === '/#' && !location.hash) ||
                        (isHome && item.href === `/#${location.hash.replace('#', '')}`);

                    return (
                        <NavItem 
                            key={item.name}
                            item={item}
                            isActive={isActive}
                            isHome={isHome}
                            mouseX={mouseX}
                        />
                    );
                })}
            </div>
        </motion.nav>
    );
}

function NavItem({ item, isActive, isHome, mouseX }) {
    const ref = useRef(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // Map distance to button dimensions
    const widthTransform = useTransform(distance, [-150, 0, 150], [44, 56, 44]);
    const heightTransform = useTransform(distance, [-150, 0, 150], [44, 56, 44]);
    const iconSizeTransform = useTransform(distance, [-150, 0, 150], [18, 24, 18]);
    const yTransform = useTransform(distance, [-150, 0, 150], [0, -8, 0]);

    const width = useSpring(widthTransform, { mass: 0.1, stiffness: 180, damping: 15 });
    const height = useSpring(heightTransform, { mass: 0.1, stiffness: 180, damping: 15 });
    const iconSize = useSpring(iconSizeTransform, { mass: 0.1, stiffness: 180, damping: 15 });
    const y = useSpring(yTransform, { mass: 0.1, stiffness: 180, damping: 15 });

    const isHashLink = item.type === 'hash';
    const targetHash = item.href.replace('/', '');

    let Component = Link;
    let props = { to: item.href };

    if (item.external) {
        Component = 'a';
        props = {
            href: item.href,
            target: '_blank',
            rel: 'noopener noreferrer'
        };
    } else if (isHashLink && isHome) {
        Component = 'a';
        props = { href: targetHash || '#' };
    }

    return (
        <Component {...props} className="relative group">
            <motion.div
                ref={ref}
                style={{ width, height, y }}
                className="relative flex items-center justify-center rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors"
            >
                {isActive && (
                    <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 z-0"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                )}

                <motion.div 
                    style={{ width: iconSize, height: iconSize }} 
                    className="relative z-10 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors"
                >
                    <item.icon className="w-full h-full" />
                </motion.div>

                {/* Tooltip */}
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 origin-bottom transition-all duration-200 px-3 py-1 bg-zinc-950/95 backdrop-blur-md rounded-lg text-[10px] tracking-wide font-mono text-zinc-300 whitespace-nowrap border border-white/5 shadow-xl">
                    {item.name}
                </span>
            </motion.div>
        </Component>
    );
}
