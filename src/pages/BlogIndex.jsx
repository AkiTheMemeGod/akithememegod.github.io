import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { getPosts } from '../utils/blog';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import clsx from 'clsx';

const titleChars = 'THE JOURNAL'.split('');

const cardVariants = {
    hidden: { opacity: 0, y: 24, clipPath: 'inset(0 0 20% 0)' },
    visible: {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0 0 0 0)',
        transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
};

function parseMinutes(readTime) {
    const match = String(readTime || '').match(/\d+/);
    return match ? Number.parseInt(match[0], 10) : 5;
}

function getUniqueTags(posts) {
    return ['all', ...new Set(posts.flatMap((post) => post.tags || []))];
}

function buildJournalBlocks(posts) {
    const blocks = [];
    let index = 0;
    let fullNext = true;

    while (index < posts.length) {
        if (fullNext || index === posts.length - 1) {
            blocks.push({ type: 'full', posts: [posts[index]] });
            index += 1;
        } else {
            blocks.push({ type: 'pair', posts: posts.slice(index, index + 2) });
            index += 2;
        }

        fullNext = !fullNext;
    }

    return blocks;
}

function JournalCard({ post, variant = 'full' }) {
    const minutes = parseMinutes(post.readTime);
    const progressWidth = Math.min(92, 24 + minutes * 10);

    if (variant === 'full') {
        return (
            <motion.article
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-120px' }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/6 bg-zinc-950/70 transition-all duration-300 hover:-translate-y-1 hover:border-white/12 hover:shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.16),transparent_34%)] opacity-90" />
                <div className="absolute inset-0 bg-grid opacity-[0.08]" />

                <Link
                    to={`/blog/${post.slug}`}
                    className="relative z-10 grid gap-8 p-8 md:p-10 lg:grid-cols-[1.2fr_0.8fr]"
                >
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime || '5 min read'}</span>
                        </div>

                        <h2 className="max-w-3xl text-3xl font-bold leading-[0.95] tracking-tight text-white transition-colors duration-300 group-hover:text-zinc-100 md:text-5xl">
                            {post.title}
                        </h2>

                        <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
                            {post.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {post.tags?.map((tag) => (
                                <span key={tag} className="editorial-chip">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-6 lg:items-end">
                        <div className="relative min-h-[220px] overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.12),transparent_25%),radial-gradient(circle_at_70%_75%,rgba(239,68,68,0.24),transparent_32%)]" />
                            <div className="relative z-10 flex h-full flex-col justify-between">
                                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">
                                    <span>Latest note</span>
                                    <Sparkles className="h-4 w-4 text-red-300" />
                                </div>
                                <div className="space-y-4">
                                    <div className="h-px w-full bg-gradient-to-r from-white/15 via-white/60 to-white/15" />
                                    <p className="max-w-xs text-sm leading-relaxed text-zinc-300">
                                        A featured entry with a cinematic lead, atmospheric framing, and a clean path into the archive.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full space-y-2 lg:max-w-sm lg:justify-self-end">
                            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                                <span>Read depth</span>
                                <span>{minutes} min</span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-white via-red-300 to-red-500"
                                    style={{ width: `${progressWidth}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.article>
        );
    }

    return (
        <motion.article
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
            className="group relative overflow-hidden rounded-[1.75rem] border border-white/6 bg-zinc-950/65 transition-all duration-300 hover:-translate-y-1 hover:border-white/12 hover:shadow-[0_18px_60px_rgba(0,0,0,0.42)]"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_30%)] opacity-100" />
            <Link to={`/blog/${post.slug}`} className="relative z-10 block h-full p-6">
                <div className="flex h-full flex-col justify-between gap-6">
                    <div className="space-y-5">
                        <div className="flex items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                            <span>{post.date}</span>
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>

                        <h3 className="text-2xl font-bold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-zinc-100">
                            {post.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-zinc-400">
                            {post.description}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {post.tags?.slice(0, 3).map((tag) => (
                                <span key={tag} className="editorial-chip">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                                <span>Read depth</span>
                                <span>{post.readTime || '5 min read'}</span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-white via-red-300 to-red-500"
                                    style={{ width: `${progressWidth}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

export function BlogIndex() {
    const [posts, setPosts] = useState([]);
    const [activeTag, setActiveTag] = useState('all');

    useEffect(() => {
        getPosts().then(setPosts);
    }, []);

    const tagOptions = useMemo(() => getUniqueTags(posts), [posts]);

    const filteredPosts = useMemo(() => {
        if (activeTag === 'all') {
            return posts;
        }

        return posts.filter((post) => post.tags?.includes(activeTag));
    }, [posts, activeTag]);

    const featuredPost = filteredPosts[0];
    const journalBlocks = useMemo(() => buildJournalBlocks(filteredPosts.slice(1)), [filteredPosts]);

    return (
        <PageWrapper className="page-shell relative min-h-screen w-full bg-black px-6 pb-24 pt-28 md:px-12">
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none" />
            <div className="fixed inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
            <div className="fixed top-0 left-1/4 h-96 w-96 rounded-full bg-red-500/5 blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="fixed bottom-0 right-1/4 h-96 w-96 rounded-full bg-white/5 blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <header className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                    <div className="space-y-6">
                        <span className="editorial-chip">THE JOURNAL</span>
                        <h1 className="flex flex-wrap text-5xl font-bold uppercase leading-[0.82] tracking-[-0.08em] text-white md:text-7xl lg:text-8xl">
                            {titleChars.map((char, index) => (
                                <motion.span
                                    key={`${char}-${index}`}
                                    initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    transition={{ delay: 0.03 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="inline-block"
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </h1>
                        <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
                            Thoughts on systems architecture, database performance, security, frontend craft, and the occasional postmortem on how things actually get built.
                        </p>
                    </div>

                    <div className="lg:justify-self-end lg:text-right">
                        <p className="max-w-md text-sm leading-relaxed text-zinc-500">
                            An editorial archive with a featured lead story, a filtered tag rail, and a staggered reading flow that gives each post its own breathing room.
                        </p>
                        <div className="mt-6 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500 lg:justify-end">
                            <span>{filteredPosts.length.toString().padStart(2, '0')} articles</span>
                            <span>•</span>
                            <span>{tagOptions.length - 1} tags</span>
                        </div>
                    </div>
                </header>

                <div className="mb-12 flex gap-2 overflow-x-auto pb-2">
                    {tagOptions.map((tag) => (
                        <motion.button
                            key={tag}
                            type="button"
                            onClick={() => setActiveTag(tag)}
                            whileTap={{ scale: 0.98 }}
                            className={clsx(
                                'shrink-0 rounded-full border px-4 py-2 text-[10px] font-mono uppercase tracking-[0.24em] transition-all duration-300',
                                activeTag === tag
                                    ? 'border-white/18 bg-white text-black'
                                    : 'border-white/8 bg-white/[0.03] text-zinc-400 hover:border-white/15 hover:text-white'
                            )}
                        >
                            {tag}
                        </motion.button>
                    ))}
                </div>

                {featuredPost ? (
                    <JournalCard post={featuredPost} variant="full" />
                ) : (
                    <div className="rounded-[2rem] border border-white/8 bg-zinc-950/60 p-10 text-center text-zinc-500">
                        No posts match this filter yet.
                    </div>
                )}

                {journalBlocks.length > 0 && (
                    <div className="mt-8 space-y-6">
                        {journalBlocks.map((block, index) =>
                            block.type === 'full' ? (
                                <JournalCard key={`full-${block.posts[0].slug}-${index}`} post={block.posts[0]} variant="full" />
                            ) : (
                                <div key={`pair-${index}`} className="grid gap-6 md:grid-cols-2">
                                    {block.posts.map((post) => (
                                        <JournalCard key={post.slug} post={post} variant="pair" />
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </PageWrapper>
    );
}