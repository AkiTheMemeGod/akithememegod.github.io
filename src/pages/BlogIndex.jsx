import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { getPosts } from '../utils/blog';
import { ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';

const cardContainerVariants = {
    animate: {
        transition: {
            staggerChildren: 0.08
        }
    }
};

const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
};

export function BlogIndex() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then(setPosts);
    }, []);

    return (
        <PageWrapper className="relative min-h-screen w-full bg-black pt-32 pb-24 px-6 md:px-12">
            {/* Background Gradient & Grain */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />
            <div className="fixed inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
            />
            {/* Ambient Blobs */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <header className="mb-24 text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 block mb-2">
                            [ THE JOURNAL ]
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4 leading-none">
                            WRITINGS
                        </h1>
                    </div>
                    <div className="text-zinc-500 text-sm md:text-base font-light leading-relaxed max-w-md md:justify-self-end">
                        <p>Thoughts and logs on system architecture, database performance, secure networks, and declarative design patterns.</p>
                    </div>
                </header>

                <motion.div 
                    variants={cardContainerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
                >
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            variants={cardVariants}
                            className={clsx(
                                "group relative rounded-2xl overflow-hidden transition-all duration-300",
                                "bg-zinc-950/40 border border-white/5",
                                "hover:border-white/10 hover:bg-zinc-950/80",
                                index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                            )}
                        >
                            <Link
                                to={`/blog/${post.slug}`}
                                className="block p-8 h-full flex flex-col justify-between"
                            >
                                {/* Inner Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3 text-[10px] tracking-widest uppercase text-zinc-500 font-mono">
                                                <time>{post.date}</time>
                                                <span>•</span>
                                                <span>{post.readTime || '5 min'}</span>
                                            </div>
                                            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                        </div>

                                        <h2 className={clsx(
                                            "font-bold text-white leading-tight group-hover:text-zinc-200 transition-colors",
                                            index === 0 ? "text-3xl md:text-4xl" : "text-xl"
                                        )}>
                                            {post.title}
                                        </h2>

                                        <p className="text-zinc-400 text-sm leading-relaxed font-sans font-light">
                                            {post.description}
                                        </p>
                                    </div>

                                    <div className="pt-8 flex flex-wrap gap-2 mt-auto">
                                        {post.tags && post.tags.map((tag) => (
                                            <span 
                                                key={tag} 
                                                className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-lg bg-zinc-900 text-zinc-500 border border-white/5 group-hover:border-white/10 group-hover:text-zinc-400 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </PageWrapper>
    );
}
