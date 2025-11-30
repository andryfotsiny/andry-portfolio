'use client';
import { motion } from 'framer-motion';
import { Code, Database, Terminal, Globe, Cpu, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Skill {
    id: string;
    name: string;
    order: number;
}

interface SkillCategory {
    id: string;
    name: string;
    icon: string;
    order: number;
    skills: Skill[];
}

interface Language {
    id: string;
    name: string;
    level: string;
    order: number;
}

// Mapping des icônes
const iconMap: { [key: string]: any } = {
    Code: Code,
    Terminal: Terminal,
    Database: Database,
    Cpu: Cpu,
    Globe: Globe,
};

export const Skills = () => {
    const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [categoriesRes, languagesRes] = await Promise.all([
                    fetch('/api/skill-category'),
                    fetch('/api/language')
                ]);

                if (!categoriesRes.ok || !languagesRes.ok) {
                    throw new Error('Erreur lors du chargement des compétences');
                }

                const categoriesData = await categoriesRes.json();
                const languagesData = await languagesRes.json();

                setSkillCategories(categoriesData);
                setLanguages(languagesData);
            } catch (err) {
                console.error('Error fetching skills:', err);
                setError('Impossible de charger les compétences');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getIcon = (iconName: string) => {
        const IconComponent = iconMap[iconName] || Code;
        return <IconComponent className="w-6 h-6 text-neon-blanc" />;
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
                <motion.div
                    className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Loader2 className="w-12 h-12 text-neon-blue animate-spin" />
                    <p className="text-neon-blue text-xl">Chargement des compétences...</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
                <motion.div
                    className="glass-panel p-8 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <p className="text-red-400 text-xl">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 bg-neon-blue text-white rounded-lg hover:bg-neon-blue/80 transition-colors"
                    >
                        Réessayer
                    </button>
                </motion.div>
            </div>
        );
    }

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

                            {skillCategories.length === 0 ? (
                                <p className="text-gray-400 text-center py-8">
                                    Aucune compétence pour le moment
                                </p>
                            ) : (
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
                                                {getIcon(category.icon)}
                                                <h4 className="text-lg font-military neon-text">{category.name}</h4>
                                            </div>

                                            {category.skills.length === 0 ? (
                                                <p className="text-gray-500 text-sm">Aucune compétence dans cette catégorie</p>
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {category.skills.map((skill, skillIndex) => (
                                                        <motion.div
                                                            key={skill.id}
                                                            className="p-3 bg-dark-gray/30 rounded-lg border border-neon-blanc/10 flex items-center justify-center"
                                                            initial={{ opacity: 0 }}
                                                            whileInView={{ opacity: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: 0.5 + catIndex * 0.1 + skillIndex * 0.05 }}
                                                            whileHover={{ scale: 1.05 }}
                                                        >
                                                            <span className="text-gray-300 text-center">{skill.name}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
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

                            {languages.length === 0 ? (
                                <p className="text-gray-400 text-center py-8">
                                    Aucune langue pour le moment
                                </p>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {languages.map((lang, index) => (
                                        <motion.div
                                            key={lang.id}
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
                            )}
                            <div className="scan-line" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};