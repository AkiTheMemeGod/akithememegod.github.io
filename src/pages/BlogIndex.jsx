import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { getPosts } from '../utils/blog';
import { ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';

export function BlogIndex() {
    const [posts, setPosts] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        getPosts().then(setPosts);
    }, []);

    useEffect(() => {
        if (posts.length > 0) {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    '.blog-card',
                    {
                        y: 100,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.15,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 85%',
                        }
                    }
                );
            }, containerRef);
            return () => ctx.revert();
        }
    }, [posts]);

    return (
        <div className="relative min-h-screen w-full bg-black pt-32 pb-24 px-6 md:px-12" ref={containerRef}>
            {/* Background Gradient & Grain */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
            />
            {/* Ambient Blobs */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <header className="mb-24 text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4 leading-none">
                            My Boring Blogs <span className="text-white/20">.</span>
                        </h1>
                    </div>
                    <div className="text-white/40 text-lg font-light leading-relaxed max-w-md md:justify-self-end">
                        <p>If you wish to understand my code, train for another 100 years. Also, I deleted that database in self-defense.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {posts.map((post, index) => (
                        <Link
                            key={post.slug}
                            to={`/blog/${post.slug}`}
                            className={clsx(
                                "blog-card group relative p-8 rounded-3xl overflow-hidden transition-all duration-700 hover:-translate-y-2",
                                "bg-zinc-900/10 backdrop-blur-2xl border border-white/5",
                                "hover:border-white/20 hover:bg-zinc-900/30",
                                // Make the first item span 2 columns if not mobile
                                index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                            )}
                        >
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-white/30 font-medium">
                                            <time>{post.date}</time>
                                            <span>•</span>
                                            <span>{post.readTime || '5 min'}</span>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                                    </div>

                                    <h2 className={clsx(
                                        "font-bold text-white leading-tight group-hover:text-white/90 transition-colors",
                                        index === 0 ? "text-4xl md:text-5xl" : "text-2xl"
                                    )}>
                                        {post.title}
                                    </h2>

                                    <p className="text-white/50 leading-relaxed font-light">
                                        {post.description}
                                    </p>
                                </div>

                                <div className="pt-8 flex flex-wrap gap-2 mt-auto">
                                    {post.tags && post.tags.map((tag, i) => (
                                        <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-wider rounded-full bg-white/5 text-white/30 border border-white/5 group-hover:border-white/10 group-hover:text-white/50 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
