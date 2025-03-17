'use client';
import { motion } from 'framer-motion';
import { Code, Database, Terminal, Globe, Cpu } from 'lucide-react';

export const Skills = () => {
    const skillCategories = [
        {
            id: 1,
            name: "Langages de programmation",
            icon: <Code className="w-6 h-6 text-neon-blanc" />,
            skills: [
                { name: "JavaScript/TypeScript" },
                { name: "Python" },
                { name: "PHP" },
            ]
        },
        {
            id: 2,
            name: "Frameworks",
            icon: <Terminal className="w-6 h-6 text-neon-blanc" />,
            skills: [
                { name: "Express.js" },
                { name: "NestJS" },
                { name: "React/Next.js" },
                { name: "Django" },
                { name: "Laravel" },
                { name: "CodeIgniter" },
            ]
        },
        {
            id: 3,
            name: "Bases de données",
            icon: <Database className="w-6 h-6 text-neon-blanc" />,
            skills: [
                { name: "MySQL" },
                { name: "PostgreSQL" },
                { name: "PostGIS" },
                { name: "Neo4j" },
                { name: "Supabase" },
            ]
        },
        {
            id: 4,
            name: "Outils",
            icon: <Cpu className="w-6 h-6 text-neon-blanc" />,
            skills: [
                { name: "Docker" },
                { name: "Git" },
                { name: "Jira" },
                { name: "Nginx" },
            ]
        }
    ];

    const languages = [
        { name: "Malagasy", level: "Natif" },
        { name: "Français", level: "Courant" },
        { name: "Anglais", level: "Niveau moyen" },
        { name: "Allemand", level: "Notions" }
    ];

    return (
        <div className="min-h-screen pt-32 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="glass-panel p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h2
                        className="text-3xl md:text-4xl font-military neon-text mb-8 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Compétences
                    </motion.h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Compétences techniques */}
                        <motion.div
                            className="tech-border"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-2xl font-military neon-text mb-6">Compétences techniques</h3>

                            <div className="flex flex-col gap-8">
                                {skillCategories.map((category, catIndex) => (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + catIndex * 0.1 }}
                                    >
                                        <div className="flex items-center gap-2 mb-4">
                                            {category.icon}
                                            <h4 className="text-lg font-military neon-text">{category.name}</h4>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {category.skills.map((skill, skillIndex) => (
                                                <motion.div
                                                    key={`${category.id}-${skillIndex}`}
                                                    className="p-3 bg-dark-gray/30 rounded-lg border border-neon-blanc/10 flex items-center justify-center"
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.5 + catIndex * 0.1 + skillIndex * 0.05 }}
                                                    whileHover={{ scale: 1.02 }}
                                                >
                                                    <span className="text-gray-300 text-center">{skill.name}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="scan-line" />
                        </motion.div>

                        {/* Langues */}
                        <motion.div
                            className="tech-border"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Globe className="w-6 h-6 text-neon-blanc" />
                                <h3 className="text-2xl font-military neon-text">Langues</h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                {languages.map((lang, index) => (
                                    <motion.div
                                        key={index}
                                        className="p-4 bg-dark-gray/30 rounded-lg border border-neon-blanc/10 flex items-center justify-between"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <span className="text-gray-300 text-lg">{lang.name}</span>
                                        <span className="text-neon-blanc text-lg">{lang.level}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="scan-line" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};