import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { Experience } from '../sections/Experience';
import { Contact } from '../sections/Contact';

export function Home() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Small timeout to allow render to complete
            setTimeout(() => {
                const id = hash.replace('#', '');
                const elem = document.getElementById(id);
                if (elem) {
                    elem.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [hash]);

    return (
        <div className="relative z-10 w-full bg-black">
            {/* Sections need IDs for hash linking to work */}
            <section id="hero"><Hero /></section>
            <section id="about"><About /></section>
            <section id="skills"><Skills /></section>
            <section id="work"><Projects /></section>
            <section id="experience"><Experience /></section>
            <section id="contact"><Contact /></section>

            {/* Background Elements (Parallax) specific to Home */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-zinc-900 to-black pointer-events-none opacity-50" />
        </div>
    );
}
