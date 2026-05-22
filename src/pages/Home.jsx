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
        <div className="page-scene relative z-10 w-full bg-black">
            {/* Sections need IDs for hash linking to work */}
            <section id="hero"><Hero /></section>
            <div className="scene-divider my-16 opacity-70" />
            <section id="about"><About /></section>
            <div className="scene-divider my-16 opacity-70" />
            <section id="skills"><Skills /></section>
            <div className="scene-divider my-16 opacity-70" />
            <section id="work"><Projects /></section>
            <div className="scene-divider my-16 opacity-70" />
            <section id="experience"><Experience /></section>
            <div className="scene-divider my-16 opacity-70" />
            <section id="contact"><Contact /></section>

            {/* Background Elements (Parallax) specific to Home */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-zinc-900 to-black pointer-events-none opacity-50" />
        </div>
    );
}
