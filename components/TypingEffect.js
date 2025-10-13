'use client';
import React, { useEffect, useState } from 'react';

const words = ["Hi, I'm Saurabh Kumar 👋",
    "Full-Stack Developer specializing in MERN Stack.",
    "Creating high-performance, scalable web applications.",
    "Expertise across UI design, backend APIs, and database management.",
    "Discover my projects and solutions."];

const TypingEffect = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIndex];
        const speed = isDeleting ? 20 : 30;

        const timeout = setTimeout(() => {
            const updatedText = isDeleting
                ? current.substring(0, text.length - 1)
                : current.substring(0, text.length + 1);

            setText(updatedText);

            if (!isDeleting && updatedText === current) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    return (
        <span>
            {text}
            <span className="cursor">|</span>
        </span>
    );
};

export default TypingEffect;
