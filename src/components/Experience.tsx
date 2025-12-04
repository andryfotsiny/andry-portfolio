'use client';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, TerminalSquare, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Experience {
    id: string;
    poste: string;
    entreprise: string;
    periode: string;
    description: string;
    technologies: string; // JSON string
    startDate?: string;
    endDate?: string;
    current: boolean;
    order: number;
}

export const Experience = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/experience');

                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des expériences');
                }

                const data = await response.json();
                setExperiences(data);
            } catch (err) {
                console.error('Error fetching experiences:', err);
                setError('Impossible de charger les expériences');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const parseTechnologies = (techString: string): string[] => {
        try {
            return JSON.parse(techString);
        } catch {
            return [];
        }
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
                    <p className="text-neon-blue text-xl">Chargement des expériences...</p>
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
        <div className="min-h-screen  px-6">
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
                        Expérience professionnelle
                    </motion.h2>

                    {experiences.length === 0 ? (
                        <p className="text-gray-400 text-center py-12">
                            Aucune expérience pour le moment
                        </p>
                    ) : (
                        <div className="relative">
                            {/* Ligne verticale de timeline */}
                            <div className="absolute left-6 top-0 h-full w-0.5 bg-neon-blanc/20"></div>

                            <div className="flex flex-col gap-12">
                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={exp.id}
                                        className="flex gap-8"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        {/* Cercle de timeline */}
                                        <div className="relative">
                                            <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-dark-gray flex items-center justify-center">
                                                <div className="w-6 h-6 rounded-full bg-neon-blanc/20 flex items-center justify-center">
                                                    <motion.div
                                                        className="w-3 h-3 rounded-full bg-neon-blanc"
                                                        animate={exp.current ? { scale: [1, 1.2, 1] } : {}}
                                                        transition={{ duration: 2, repeat: exp.current ? Infinity : 0 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contenu */}
                                        <div className="flex-1 ml-6 tech-border">
                                            <div className="flex justify-between items-start flex-wrap gap-2">
                                                <div>
                                                    <h3 className="text-xl font-military neon-text">{exp.poste}</h3>
                                                    <div className="flex items-center gap-2 text-gray-400">
                                                        <Briefcase className="w-4 h-4" />
                                                        <span>{exp.entreprise}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    <span className="text-gray-400">{exp.periode}</span>
                                                    {exp.current && (
                                                        <span className="ml-2 px-2 py-1 text-xs bg-neon-green/20 text-neon-green rounded-full">
                              En cours
                            </span>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="mt-4 text-gray-300">{exp.description}</p>

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {parseTechnologies(exp.technologies).map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 rounded-full bg-neon-blanc/10 text-neon-blanc text-xs flex items-center gap-1"
                                                    >
                            <TerminalSquare className="w-3 h-3" />
                                                        {tech}
                          </span>
                                                ))}
                                            </div>
                                            <div className="scan-line" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};