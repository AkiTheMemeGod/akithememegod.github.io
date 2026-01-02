import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPost } from '../utils/blog';
import { ArrowLeft, Calendar, Clock, Tag, Copy, Check } from 'lucide-react';
import clsx from 'clsx';
import gsap from 'gsap';

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
            <div className="my-8 rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/10 shadow-2xl">
                {/* MacOS-style Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="text-xs text-white/40 font-mono">
                        {match[1]}
                    </div>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
                    >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>

                {/* Code Content */}
                <div className="p-0 overflow-x-auto">
                    <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        showLineNumbers={true}
                        lineNumberStyle={{ minWidth: '2.5em', paddingRight: '1em', color: 'rgba(255,255,255,0.2)', textAlign: 'right' }}
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
        <code className={clsx("px-1.5 py-0.5 rounded-md bg-white/10 text-pink-300 font-mono text-sm border border-white/5", className)} {...props}>
            {children}
        </code>
    );
};

export function BlogPost() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPost(slug)
            .then(data => {
                setPost(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

        window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        if (!loading && post) {
            gsap.fromTo(
                '.post-content',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
            );
        }
    }, [loading, post]);

    if (loading) return null;
    if (!post) return <div className="min-h-screen flex items-center justify-center text-white/50">Post not found</div>;

    return (
        <article className="relative min-h-screen w-full bg-black selection:bg-cyan-500/30 selection:text-cyan-50">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-zinc-950 via-black to-black pointer-events-none" />
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-40">
                <Link to="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-16 transition-colors group px-4 py-2 rounded-full hover:bg-white/5 w-fit">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Notes</span>
                </Link>

                <header className="mb-20 text-center md:text-left space-y-8 border-b border-white/5 pb-20">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-white/40 font-mono uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <time>{post.date}</time>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime || '5 min read'}</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.1] md:leading-[1.1]">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        {post.tags && post.tags.map(tag => (
                            <div key={tag} className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-sm text-cyan-200/70">
                                <Tag className="w-3 h-3" />
                                <span>{tag}</span>
                            </div>
                        ))}
                    </div>
                </header>

                <div className="post-content opacity-0">
                    <div className="prose prose-invert prose-lg md:prose-xl max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white 
                        prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:font-light
                        prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300 hover:prose-a:underline
                        prose-blockquote:border-l-cyan-500/50 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-white/70
                        prose-strong:text-white prose-strong:font-semibold
                        prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-white/10
                        prose-hr:border-white/10 prose-hr:my-16
                    ">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                code: CodeBlock
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </article>
    );
}
