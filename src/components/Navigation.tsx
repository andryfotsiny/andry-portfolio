'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronUp, Menu } from 'lucide-react';

const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'formation', label: 'Formation' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projets Personnels' },
    { id: 'skills', label: 'Compétences' },
    { id: 'contact', label: 'Contact' },
];

export const Navigation = () => {
    const [activeItem, setActiveItem] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Détecter si l'utilisateur a scrollé
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);

            // Afficher le bouton "retour en haut" après avoir scrollé une certaine distance
            setShowScrollToTop(window.scrollY > 300);

            // Déterminer la section active en fonction du scroll
            const sections = document.querySelectorAll('section[id]');

            sections.forEach(section => {
                // Cast section to HTMLElement to access offsetTop and offsetHeight
                const htmlSection = section as HTMLElement;
                const sectionTop = htmlSection.offsetTop - 100;
                const sectionHeight = htmlSection.offsetHeight;

                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    setActiveItem(section.getAttribute('id') || 'home');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const scrollToSection = (id: string) => {
        setActiveItem(id);
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            // Cast element to HTMLElement to access offsetTop
            const htmlElement = element as HTMLElement;
            window.scrollTo({
                top: htmlElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <motion.nav
                className={`fixed top-0 w-full z-50 px-4 md:px-6 py-4 transition-all duration-300 ${
                    scrolled ? 'bg-darker-gray/90 backdrop-blur-md shadow-md' : 'glass-panel'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="relative group">
                            <motion.div
                                className="absolute -inset-1 bg-gradient-to-r from-neon-blanc to-neon-blanc opacity-30 blur-lg group-hover:opacity-50 transition duration-300"
                                animate={{
                                    scale: [1, 0.5, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            />
                            <motion.div
                                className="relative flex items-center gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.h1
                                    className="text-xl md:text-2xl font-military neon-text glitch"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    PI_DEV
                                    <Shield className="w-3 h-3 md:w-4 md:h-4 text-neon-blanc absolute -top-2 -right-4" />
                                </motion.h1>
                            </motion.div>
                        </div>

                        {/* Desktop Menu */}
                        <motion.div
                            className="hidden md:flex flex-wrap justify-center gap-4"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {menuItems.map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    className={`menu-item font-military ${activeItem === item.id ? 'text-neon-blanc' : ''}`}
                                    onClick={() => scrollToSection(item.id)}
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    {item.label}
                                    {activeItem === item.id && (
                                        <motion.span
                                            className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-blanc"
                                            layoutId="underline"
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Mobile: Current Section + Menu Button */}
                        <div className="flex md:hidden items-center gap-3">
                            <motion.div
                                className="glass-panel px-3 py-1.5 rounded-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <span className="text-sm font-military text-neon-blanc">
                                    {menuItems.find(item => item.id === activeItem)?.label}
                                </span>
                            </motion.div>

                            <motion.button
                                className="p-2 rounded-lg bg-neon-blanc/10 border border-neon-blanc/20 text-neon-blanc"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Menu size={20} />
                            </motion.button>
                        </div>
                    </div>
                </div>
                <div className="scan-line" />
            </motion.nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            className="fixed top-16 right-4 z-50 md:hidden glass-panel p-4 rounded-lg w-64"
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex flex-col gap-2">
                                {menuItems.map((item) => (
                                    <motion.button
                                        key={item.id}
                                        className={`text-left px-4 py-3 rounded-lg font-military transition-all ${
                                            activeItem === item.id
                                                ? 'bg-neon-blanc/20 text-neon-blanc border border-neon-blanc/30'
                                                : 'hover:bg-white/5 text-gray-300'
                                        }`}
                                        onClick={() => scrollToSection(item.id)}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Bouton de retour en haut */}
            <motion.button
                className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-neon-blanc/10 backdrop-blur-sm border border-neon-blanc/20 text-neon-blanc hover:bg-neon-blanc/20 transition-all duration-300"
                onClick={scrollToTop}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: showScrollToTop ? 1 : 0,
                    scale: showScrollToTop ? 1 : 0.8,
                    pointerEvents: showScrollToTop ? 'auto' : 'none'
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ChevronUp size={24} />
            </motion.button>
        </>
    );
};