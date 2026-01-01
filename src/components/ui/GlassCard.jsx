import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function GlassCard({ children, className, ...props }) {
    return (
        <div
            className={twMerge(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-3xl",
                "transition-all duration-300 hover:bg-white/10 hover:shadow-white/5",
                className
            )}
            {...props}
        >
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
