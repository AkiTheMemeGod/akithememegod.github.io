import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    BadgeCheck,
    BriefcaseBusiness,
    Code2,
    Download,
    ExternalLink,
    FileText,
    Github,
    GraduationCap,
    Linkedin,
    Mail,
    MapPin,
    Sparkles,
} from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';

const quickFacts = [
    { label: 'Experience', value: '3+ years' },
    { label: 'Response gain', value: '30% faster' },
    { label: 'Setup time', value: '50% less' },
    { label: 'Graduation', value: 'May 2026' },
];

const highlights = [
    'Full-stack developer focused on secure, scalable APIs and SaaS products.',
    'Built ProtoBase, MindVault, and AnarchKey, blending product thinking with security.',
    'Hands-on across Python, React, Flask, Node.js, MongoDB, SQLite, Azure, and Docker.',
];

const timeline = [
    {
        icon: BriefcaseBusiness,
        title: 'CheckPoint Systems',
        meta: 'Bangalore · Feb 2025 - Jul 2025',
        body: 'Designed APIs for real-time systems, integrated React with Flask, and improved response time by 30%.',
    },
    {
        icon: GraduationCap,
        title: 'SRM Institute of Science and Technology',
        meta: 'CSE with Cybersecurity Specialization',
        body: 'CGPA 9.59, relevant coursework in cybersecurity, data structures, web development, and cloud computing.',
    },
    {
        icon: Code2,
        title: 'Project stack',
        meta: 'MindVault · ProtoBase · AnarchKey',
        body: 'Productive systems built with React, Python, Flask, Node.js, Express, MongoDB, SQLite, and cryptography.',
    },
];

const skillGroups = [
    {
        title: 'Frontend',
        body: 'React.js, HTML, CSS, Tailwind',
    },
    {
        title: 'Backend',
        body: 'Flask, Node.js, FastAPI, Express.js',
    },
    {
        title: 'Platform',
        body: 'Azure, Docker, Git, Firebase, Supabase',
    },
];

const certificationHighlights = [
    'Certified Ethical Hacker',
    'Postman API Fundamentals Student Expert',
    'Python3 and HackerRank certifications',
    'REST API, SQL, Problem Solving, and Software Engineer credentials',
];

function SectionCard({ icon: Icon, title, meta, body }) {
    return (
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05]">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/85">
                    <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 space-y-2">
                    <div>
                        <h3 className="text-sm font-semibold tracking-tight text-white">{title}</h3>
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{meta}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-300">{body}</p>
                </div>
            </div>
        </div>
    );
}

function MiniStat({ label, value }) {
    return (
        <div className="rounded-[1.25rem] border border-white/10 bg-black/30 px-4 py-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-zinc-500">{label}</div>
            <div className="mt-2 text-lg font-semibold tracking-tight text-white">{value}</div>
        </div>
    );
}

export function Resume() {
    return (
        <PageWrapper className="page-shell relative min-h-screen w-full bg-black px-6 pb-24 pt-28 md:px-12">
            <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.12),transparent_26%),radial-gradient(circle_at_86%_14%,rgba(239,68,68,0.14),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.98)_0%,rgba(5,5,5,1)_46%,rgba(0,0,0,1)_100%)] pointer-events-none" />
            <div className="fixed inset-0 z-0 bg-grid opacity-[0.18] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8 flex flex-wrap items-center justify-between gap-4"
                >
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:border-white/16 hover:bg-white/[0.06] hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                        Back home
                    </Link>

                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-red-300" />
                            Browser-native resume
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                            <MapPin className="h-3.5 w-3.5 text-zinc-300" />
                            Chennai, Tamil Nadu, India
                        </span>
                    </div>
                </motion.div>

                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_22rem]">
                    <div className="space-y-8">
                        <header className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:p-10">
                            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
                                <div className="space-y-6">
                                    <span className="editorial-chip">Resume / CV</span>
                                    <h1 className="max-w-3xl text-4xl font-bold leading-[0.92] tracking-[-0.08em] text-white md:text-6xl lg:text-7xl">
                                        A resume that reads like a live document, not a dead attachment.
                                    </h1>
                                    <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base">
                                        Open the PDF directly inside the site, keep the browser chrome on the page, and pair the document with a fast editorial summary so recruiters can skim and dig in without leaving the tab.
                                    </p>
                                    <div className="flex flex-wrap gap-3 pt-2">
                                        <a
                                            href="/resume.pdf"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black transition-transform duration-300 hover:-translate-y-0.5"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            Open PDF
                                        </a>
                                        <a
                                            href="/resume.pdf"
                                            download
                                            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors duration-300 hover:border-white/18 hover:bg-white/[0.08]"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download
                                        </a>
                                        <a
                                            href="mailto:k.akashkumar@gmail.com"
                                            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-300 transition-colors duration-300 hover:border-white/18 hover:bg-white/[0.08] hover:text-white"
                                        >
                                            <Mail className="h-4 w-4" />
                                            Email me
                                        </a>
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    {quickFacts.map((fact) => (
                                        <MiniStat key={fact.label} {...fact} />
                                    ))}
                                </div>
                            </div>
                        </header>

                        <div className="grid gap-4 md:grid-cols-3">
                            {highlights.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-zinc-300 shadow-[0_20px_50px_rgba(0,0,0,0.26)] backdrop-blur-xl"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>

                        <section className="rounded-[2rem] border border-white/10 bg-black/40 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
                            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-6">
                                <div className="flex items-center gap-2.5">
                                    <span className="h-3 w-3 rounded-full bg-red-400/80" />
                                    <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                                    <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                                </div>
                                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                                    resume.pdf
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-300 transition-colors hover:border-white/18 hover:bg-white/[0.08] hover:text-white"
                                    >
                                        View full
                                    </a>
                                    <a
                                        href="/resume.pdf"
                                        download
                                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-300 transition-colors hover:border-white/18 hover:bg-white/[0.08] hover:text-white"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>

                            <div className="relative h-[78dvh] min-h-[42rem] bg-[#090909]">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_20%,transparent_80%,rgba(255,255,255,0.02))] pointer-events-none" />
                                <object
                                    data="/resume.pdf#view=FitH&toolbar=0&navpanes=0&scrollbar=0"
                                    type="application/pdf"
                                    className="relative z-10 h-full w-full"
                                >
                                    <div className="flex h-full items-center justify-center px-8 text-center">
                                        <div className="max-w-lg space-y-4">
                                            <FileText className="mx-auto h-10 w-10 text-white/60" />
                                            <h2 className="text-xl font-semibold text-white">PDF preview unavailable in this browser.</h2>
                                            <p className="text-sm leading-relaxed text-zinc-400">
                                                Use the open or download buttons above to view the full resume in a separate tab.
                                            </p>
                                        </div>
                                    </div>
                                </object>
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
                            <div className="mb-5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                                <BadgeCheck className="h-4 w-4 text-red-300" />
                                What stands out
                            </div>
                            <div className="space-y-3">
                                {timeline.map((entry) => (
                                    <SectionCard key={entry.title} {...entry} />
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
                            <div className="mb-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                                <Code2 className="h-4 w-4 text-cyan-300" />
                                Core skills
                            </div>
                            <div className="space-y-3">
                                {skillGroups.map((item) => (
                                    <div key={item.title} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                                        <div className="text-sm font-semibold text-white">{item.title}</div>
                                        <div className="mt-1 text-sm leading-relaxed text-zinc-400">{item.body}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
                            <div className="mb-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                                <Github className="h-4 w-4 text-zinc-300" />
                                Contact
                            </div>
                            <div className="space-y-3 text-sm text-zinc-300">
                                <a className="block transition-colors hover:text-white" href="mailto:k.akashkumar@gmail.com">
                                    k.akashkumar@gmail.com
                                </a>
                                <a
                                    className="block transition-colors hover:text-white"
                                    href="https://github.com/AkiTheMemeGod"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    github.com/AkiTheMemeGod
                                </a>
                                <a
                                    className="block transition-colors hover:text-white"
                                    href="https://www.linkedin.com/in/akash-k19052022/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    linkedin.com/in/akash-k19052022
                                </a>
                            </div>
                            <div className="mt-5 flex gap-3">
                                <a
                                    href="https://github.com/AkiTheMemeGod"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                                    aria-label="GitHub"
                                >
                                    <Github className="h-4 w-4" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/akash-k19052022/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
                            <div className="mb-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-500">
                                <FileText className="h-4 w-4 text-red-300" />
                                Certifications
                            </div>
                            <div className="space-y-3">
                                {certificationHighlights.map((item) => (
                                    <div key={item} className="rounded-[1.15rem] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-relaxed text-zinc-300">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </PageWrapper>
    );
}