import React from 'react';
import { Home, User, Code, FolderGit2, History, Mail, FileText, BookOpen, PersonStanding, PenBox } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

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

    return (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            {/* Floating Container (No outlines/backgrounds) */}
            <div className="flex items-end gap-2 px-4 py-2 pointer-events-auto">
                {navItems.map((item) => {
                    const isActive =
                        (item.href === '/blog' && location.pathname.startsWith('/blog')) ||
                        (isHome && item.href === '/#' && !location.hash) ||
                        (isHome && item.href === `/#${location.hash.replace('#', '')}`);

                    // Use <a> for external, or same-page hash links to preserve native scroll behavior
                    // Use <Link> for cross-page navigation

                    const isHashLink = item.type === 'hash';
                    const targetHash = item.href.replace('/', ''); // e.g. #about

                    let Component = Link;
                    let props = {
                        to: item.href,
                    };

                    if (item.external) {
                        Component = 'a';
                        props = {
                            href: item.href,
                            target: '_blank',
                            rel: 'noopener noreferrer'
                        };
                    } else if (isHashLink && isHome) {
                        Component = 'a';
                        props = {
                            href: targetHash || '#', // #about or #
                        };
                    }

                    return (
                        <Component
                            key={item.name}
                            {...props}
                            className={clsx(
                                "relative group flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ease-out",
                                "hover:w-16 hover:h-16 hover:-translate-y-4",
                                isActive ? "text-white" : "text-white/60 hover:text-white"
                            )}
                        >
                            {/* Glassy Background only on individual Item Hover if needed, or just keep pure float */}
                            <div className={clsx(
                                "absolute inset-0 bg-black/40 backdrop-blur-md rounded-xl transition-opacity duration-300 border border-white/10",
                                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )} />

                            <div className="relative z-10 p-2">
                                <item.icon className={clsx(
                                    "w-6 h-6 transition-all duration-300",
                                    "group-hover:w-8 group-hover:h-8"
                                )} />
                            </div>

                            {/* Tooltip */}
                            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg text-xs text-white whitespace-nowrap border border-white/10">
                                {item.name}
                            </span>

                            {/* Active Indicator (Dot) */}
                            <div className={clsx(
                                "absolute -bottom-2 w-1 h-1 bg-white rounded-full transition-opacity duration-300",
                                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )} />
                        </Component>
                    );
                })}
            </div>
        </nav>
    );
}
