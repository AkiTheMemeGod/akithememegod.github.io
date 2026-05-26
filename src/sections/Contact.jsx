import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Mail, ExternalLink, Check, Copy } from 'lucide-react';

const bootScript = [
    { type: 'system', text: 'Initializing secure connection protocol...' },
    { type: 'system', text: 'Connected to gateway: akash.dev [AES-256-GCM]' },
    { type: 'command', text: './load_contact_menu.sh' },
    { type: 'output', text: 'Available commands loaded. Select a target below to execute:' },
];

export function Contact() {
    const [history, setHistory] = useState([]);
    const [bootStep, setBootStep] = useState(0);
    const [copied, setCopied] = useState(false);
    const terminalBodyRef = useRef(null);

    const email = 'k.akashkumar@gmail.com';

    // Auto-scroll terminal body (not the page) to bottom when history changes
    useEffect(() => {
        if (history.length > 0 || bootStep > 0) {
            const el = terminalBodyRef.current;
            if (el) {
                el.scrollTop = el.scrollHeight;
            }
        }
    }, [history, bootStep]);
    

    useEffect(() => {
        if (bootStep >= bootScript.length) {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            setBootStep((current) => current + 1);
        }, 230);

        return () => window.clearTimeout(timer);
    }, [bootStep]);

    const addLog = (command, outputs) => {
        setHistory(prev => [
            ...prev,
            { type: 'command', text: command },
            ...outputs.map(o => ({ type: 'output', text: o }))
        ]);
    };

    const handleEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        addLog('cat contact_info.json', [
            '{',
            `  "email": "${email}",`,
            '  "location": "TamilNadu, India",',
            '  "status": "Active / Accepting selective roles"',
            '}',
            '>> SUCCESS: Email copied to clipboard.'
        ]);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleGithub = () => {
        addLog('curl -s https://api.github.com/users/AkiTheMemeGod', [
            'Fetching remote user manifest...',
            '>> REDIRECT: Redirecting to github.com/AkiTheMemeGod'
        ]);
        setTimeout(() => {
            window.open('https://github.com/AkiTheMemeGod', '_blank', 'noopener,noreferrer');
        }, 800);
    };

    const handleLinkedin = () => {
        addLog('ssh -T git@linkedin.com/in/akash-k19052022', [
            'Negotiating secure handshake...',
            '>> REDIRECT: Redirecting to linkedin.com/in/akash-k19052022'
        ]);
        setTimeout(() => {
            window.open('https://linkedin.com/in/akash-k19052022', '_blank', 'noopener,noreferrer');
        }, 800);
    };

    const handleClear = () => {
        setHistory([
            { type: 'command', text: 'clear' },
            { type: 'output', text: 'Console cleared. Active terminal session ready.' }
        ]);
    };

    return (
        <section 
            id="contact" 
            className="page-scene relative min-h-[100dvh] w-full flex items-center justify-center bg-black px-6 py-32"
        >
            <div className="w-full max-w-3xl z-10 flex flex-col space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
                        [ SECURE CHANNEL ]
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mt-2">
                        ESTABLISH CONNECTION
                    </h2>
                    <p className="text-zinc-500 text-sm md:text-base font-light max-w-lg mx-auto">
                        Trigger commands below to fetch coordinates or access social gateway routing.
                    </p>
                </div>

                {/* The Terminal Box */}
                <div className="w-full bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs md:text-sm">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d0d] border-b border-white/5 select-none">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="text-zinc-500 text-[10px] md:text-xs">
                            guest@akash.dev: ~
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-green-500/80 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            SECURE
                        </div>
                    </div>

                    {/* Terminal Logs Body */}
                    <div ref={terminalBodyRef} className="p-6 space-y-3 h-64 overflow-y-auto border-b border-white/5 scrollbar-thin scrollbar-thumb-zinc-800">
                        {bootScript.slice(0, bootStep).map((log, idx) => (
                            <motion.div
                                key={`boot-${idx}`}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="leading-relaxed"
                            >
                                {log.type === 'system' && (
                                    <span className="text-zinc-500">[* {log.text}]</span>
                                )}
                                {log.type === 'command' && (
                                    <span className="boot-cursor">
                                        <span className="text-red-500">guest@akash.dev:~$</span>{' '}
                                        <span className="text-white">{log.text}</span>
                                    </span>
                                )}
                                {log.type === 'output' && (
                                    <span className="text-zinc-400 whitespace-pre-wrap">{log.text}</span>
                                )}
                            </motion.div>
                        ))}

                        {history.map((log, idx) => (
                            <div key={idx} className="leading-relaxed">
                                {log.type === 'system' && (
                                    <span className="text-zinc-500">[* {log.text}]</span>
                                )}
                                {log.type === 'command' && (
                                    <span>
                                        <span className="text-red-500">guest@akash.dev:~$</span>{' '}
                                        <span className="text-white">{log.text}</span>
                                    </span>
                                )}
                                {log.type === 'output' && (
                                    <span className="text-zinc-400 whitespace-pre-wrap">{log.text}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Interactive Input Buttons (Menu Options) */}
                    <div className="p-4 bg-[#080808] grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button
                            onClick={handleEmail}
                            className="flex items-center justify-between p-3.5 bg-zinc-950 hover:bg-zinc-900 border border-white/5 hover:border-red-500/20 text-zinc-300 hover:text-white rounded-lg transition-all text-left group"
                        >
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-red-500/80 group-hover:text-red-500" />
                                <span>cat contact_info.json</span>
                            </div>
                            {copied ? (
                                <Check className="w-4 h-4 text-green-500" />
                            ) : (
                                <Copy className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400" />
                            )}
                        </button>

                        <button
                            onClick={handleGithub}
                            className="flex items-center justify-between p-3.5 bg-zinc-950 hover:bg-zinc-900 border border-white/5 hover:border-red-500/20 text-zinc-300 hover:text-white rounded-lg transition-all text-left group"
                        >
                            <div className="flex items-center space-x-3">
                                <Github className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                                <span>curl -s github.manifest</span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400" />
                        </button>

                        <button
                            onClick={handleLinkedin}
                            className="flex items-center justify-between p-3.5 bg-zinc-950 hover:bg-zinc-900 border border-white/5 hover:border-red-500/20 text-zinc-300 hover:text-white rounded-lg transition-all text-left group"
                        >
                            <div className="flex items-center space-x-3">
                                <Linkedin className="w-4 h-4 text-blue-500/80 group-hover:text-blue-500" />
                                <span>ssh linkedin_profile</span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400" />
                        </button>

                        <button
                            onClick={handleClear}
                            className="flex items-center justify-between p-3.5 bg-zinc-950 hover:bg-zinc-900 border border-white/5 hover:border-red-500/20 text-zinc-500 hover:text-zinc-300 rounded-lg transition-all text-left group"
                        >
                            <div className="flex items-center space-x-3">
                                <Terminal className="w-4 h-4" />
                                <span>clear console</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="text-center">
                    <p className="text-zinc-700 font-mono text-xs tracking-wider">
                        // HAND-CRAFTED BY AKASH KUMAR
                    </p>
                </div>
            </div>
        </section>
    );
}
