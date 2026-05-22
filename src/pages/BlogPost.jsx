import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPost } from '../utils/blog';
import { ArrowLeft, Calendar, Clock, Tag, Copy, Check, ArrowUpRight, List } from 'lucide-react';
import clsx from 'clsx';
import { PageWrapper } from '../components/layout/PageWrapper';
import { motion, useScroll, useTransform } from 'framer-motion';

function slugify(value) {
    return String(value)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function getText(children) {
    return React.Children.toArray(children)
        .map((child) => (typeof child === 'string' ? child : String(child)))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function extractHeadings(content) {
    return String(content || '')
        .split('\n')
        .filter((line) => /^#{2,3}\s+/.test(line))
        .map((line) => {
            const levelMatch = line.match(/^#{2,3}/);
            const title = line.replace(/^#{2,3}\s+/, '').trim();

            return {
                level: levelMatch ? levelMatch[0].length : 2,
                title,
                id: slugify(title),
            };
        });
}

const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!inline && match) {
        return (
            <div className="my-8 overflow-hidden rounded-2xl border border-white/5 bg-zinc-950 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/5 bg-zinc-900/50 px-4 py-3">
                    <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500/80" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                        <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="font-mono text-xs text-zinc-500">{match[1]}</div>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
                    >
                        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>

                <div className="overflow-x-auto p-0">
                    <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        showLineNumbers
                        lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: 'rgba(255,255,255,0.1)', textAlign: 'right' }}
                        customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', fontSize: '0.9rem', lineHeight: '1.6' }}
                        {...props}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </div>
            </div>
        );
    }

    return (
        <code className={clsx('rounded-md border border-white/5 bg-white/10 px-1.5 py-0.5 font-mono text-sm text-red-300', className)} {...props}>
            {children}
        </code>
    );
};

export function BlogPost() {
    const { slug } = useParams();
    const pageRef = useRef(null);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeHeading, setActiveHeading] = useState('');

    useEffect(() => {
        getPost(slug)
            .then((data) => {
                setPost(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });

        window.scrollTo(0, 0);
    }, [slug]);

    const headings = useMemo(() => extractHeadings(post?.content || ''), [post?.content]);

    const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end end'] });
    const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const ambientY = useTransform(scrollYProgress, [0, 1], ['-4%', '10%']);

    useEffect(() => {
        if (!headings.length) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting);

                if (visible[0]) {
                    setActiveHeading(visible[0].target.id);
                }
            },
            {
                rootMargin: '-32% 0px -55% 0px',
                threshold: 0.05,
            }
        );

        const elements = headings
            .map((heading) => document.getElementById(heading.id))
            .filter(Boolean);

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [headings]);

    if (loading) {
        return (
            <PageWrapper className="page-shell relative min-h-screen w-full bg-black selection:bg-red-500/30 selection:text-red-50">
                <div className="flex min-h-screen items-center justify-center text-zinc-500">
                    Loading journal entry...
                </div>
            </PageWrapper>
        );
    }

    if (!post) {
        return <div className="flex min-h-screen items-center justify-center text-white/50">Post not found</div>;
    }

    const MotionLink = motion(Link);

    const MarkdownHeading = (Tag) => ({ children, className, ...props }) => {
        const title = getText(children);
        const id = slugify(title);

        return (
            <Tag id={id} data-heading-id={id} className={clsx('scroll-mt-28', className)} {...props}>
                {children}
            </Tag>
        );
    };

    return (
        <PageWrapper className="page-shell relative min-h-screen w-full bg-black selection:bg-red-500/30 selection:text-red-50">
            <motion.div style={{ width: progress }} className="reading-progress" />

            <div ref={pageRef} className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 pb-40 pt-28 lg:grid-cols-[minmax(0,1fr)_18rem] md:px-12">
                <div className="min-w-0">
                    <MotionLink
                        to="/blog"
                        whileHover="hover"
                        className="group mb-10 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 font-mono text-xs text-zinc-500 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                        <span className="transition-transform duration-300 group-hover:-translate-x-1">//</span>
                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        <span>Back to notes</span>
                    </MotionLink>

                    <header className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-zinc-950/70 p-8 md:p-12">
                        <motion.div style={{ y: ambientY }} className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(239,68,68,0.12),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.07),transparent_28%)]" />
                        <div className="relative z-10 space-y-8">
                            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-[0.24em] text-zinc-500">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <time>{post.date}</time>
                                </div>
                                <div className="h-1 w-1 rounded-full bg-zinc-700" />
                                <div className="flex items-center gap-2">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>{post.readTime || '5 min read'}</span>
                                </div>
                            </div>

                            <h1 className="max-w-4xl bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-4xl font-bold leading-[0.95] tracking-[-0.08em] text-transparent md:text-6xl lg:text-7xl">
                                {post.title}
                            </h1>

                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.04 } },
                                }}
                                className="flex flex-wrap gap-2 pt-1"
                            >
                                {post.tags?.map((tag) => (
                                    <motion.span
                                        key={tag}
                                        variants={{
                                            hidden: { opacity: 0, y: 8 },
                                            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                                        }}
                                        className="editorial-chip"
                                    >
                                        <Tag className="h-3 w-3 text-red-300" />
                                        <span>{tag}</span>
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </header>

                    <motion.article
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                        className="post-content prose-editorial prose prose-invert mt-12 max-w-none prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:font-light prose-a:text-red-400 prose-a:no-underline hover:prose-a:text-red-300 hover:prose-a:underline prose-blockquote:border-l-red-500/50 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-white/70 prose-strong:text-white prose-strong:font-semibold prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-white/10 prose-hr:border-white/10 prose-hr:my-16"
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                h2: MarkdownHeading('h2'),
                                h3: MarkdownHeading('h3'),
                                h4: MarkdownHeading('h4'),
                                code: CodeBlock,
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </motion.article>
                </div>

                <aside className="hidden lg:block">
                    <div className="sticky top-28 rounded-[1.75rem] border border-white/8 bg-zinc-950/70 p-6">
                        <div className="mb-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                            <List className="h-4 w-4" />
                            <span>On this page</span>
                        </div>

                        <nav className="space-y-2">
                            {headings.length > 0 ? (
                                headings.map((heading) => (
                                    <a
                                        key={heading.id}
                                        href={`#${heading.id}`}
                                        className={clsx(
                                            'block rounded-xl border-l-2 px-3 py-2 text-sm transition-all duration-300',
                                            activeHeading === heading.id
                                                ? 'border-white/18 bg-white/[0.05] text-white'
                                                : 'border-white/8 text-zinc-500 hover:border-white/12 hover:bg-white/[0.03] hover:text-zinc-200'
                                        )}
                                    >
                                        <span className={clsx(heading.level === 3 ? 'pl-4 text-zinc-500' : '')}>
                                            {heading.title}
                                        </span>
                                    </a>
                                ))
                            ) : (
                                <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4 text-sm text-zinc-500">
                                    No section headings found.
                                </div>
                            )}
                        </nav>

                        <div className="mt-6 rounded-xl border border-white/8 bg-white/[0.03] p-4 text-xs leading-relaxed text-zinc-500">
                            Scroll progress updates at the top, and the table of contents follows the current section as you read.
                        </div>
                    </div>
                </aside>
            </div>
        </PageWrapper>
    );
}