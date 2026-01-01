import React from 'react';
import { Home, User, Code, FolderGit2, History, Mail } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
    { name: 'Home', icon: Home, href: '#' },
    { name: 'About', icon: User, href: '#about' },
    { name: 'Skills', icon: Code, href: '#skills' },
    { name: 'Work', icon: FolderGit2, href: '#work' },
    { name: 'Journey', icon: History, href: '#experience' },
    { name: 'Contact', icon: Mail, href: '#contact' },
];

export function Navbar() {
    return (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            {/* Floating Container (No outlines/backgrounds) */}
            <div className="flex items-end gap-2 px-4 py-2 pointer-events-auto">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className={clsx(
                            "relative group flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ease-out",
                            "hover:w-16 hover:h-16 hover:-translate-y-4",
                            "text-white/60 hover:text-white"
                        )}
                    >
                        {/* Glassy Background only on individual Item Hover if needed, or just keep pure float */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10" />

                        <div className="relative z-10 p-2">
                            <item.icon className="w-6 h-6 group-hover:w-8 group-hover:h-8 transition-all duration-300" />
                        </div>

                        {/* Tooltip */}
                        <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg text-xs text-white whitespace-nowrap border border-white/10">
                            {item.name}
                        </span>

                        {/* Active Indicator (Dot) */}
                        <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                ))}
            </div>
        </nav>
    );
}
