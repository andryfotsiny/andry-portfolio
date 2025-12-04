'use client';
import { motion } from 'framer-motion';
import { Code2, Terminal, Loader2, ExternalLink, Github, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Project {
    id: string;
    titre: string;
    description: string;
    technologies: string;
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    featured: boolean;
    order: number;
}

export const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/projects');

                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des projets');
                }

                const data = await response.json();
                setProjects(data);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Impossible de charger les projets');
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
            <div className="min-h-screen px-6 flex items-center justify-center">
                <motion.div
                    className="flex flex-col items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Loader2 className="w-12 h-12 text-neon-blue animate-spin" />
                    <p className="text-neon-blue text-xl">Chargement des projets...</p>
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
                        Projets Personnels
                    </motion.h2>

                    {projects.length === 0 ? (
                        <p className="text-gray-400 text-center py-12">
                            Aucun projet pour le moment
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    className="relative tech-border overflow-hidden group"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {/* Badge Featured */}
                                    {project.featured && (
                                        <div className="absolute top-4 right-4 z-10">
                                            <motion.div
                                                className="flex items-center gap-1 px-2 py-1 bg-neon-green/20 text-neon-green rounded-full text-xs"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                                            >
                                                <Star className="w-3 h-3 fill-current" />
                                                <span>Featured</span>
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* Image du projet */}
                                    {project.imageUrl && (
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={project.imageUrl}
                                                alt={project.titre}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-dark-gray/50 to-transparent"></div>
                                        </div>
                                    )}

                                    {/* Informations du projet */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Code2 className="w-5 h-5 text-neon-blanc" />
                                            <h3 className="text-xl font-military neon-text">{project.titre}</h3>
                                        </div>

                                        <p className="text-gray-300 mb-4">{project.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {parseTechnologies(project.technologies).map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 rounded-full bg-neon-blanc/10 text-neon-blanc text-xs flex items-center gap-1"
                                                >
                                                    <Terminal className="w-3 h-3" />
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Liens */}
                                        {(project.githubUrl || project.liveUrl) && (
                                            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-neon-blanc/10">
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-sm text-neon-blanc hover:text-neon-blue transition-colors group"
                                                    >
                                                        <Github className="w-4 h-4 flex-shrink-0" />
                                                        <span className="truncate group-hover:underline">{project.githubUrl}</span>
                                                    </a>
                                                )}
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-sm text-neon-blue hover:text-neon-green transition-colors group"
                                                    >
                                                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                                        <span className="truncate group-hover:underline">{project.liveUrl}</span>
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="scan-line" />

                                    {/* Effet de lueur au survol */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-neon-blanc/0 via-neon-blanc/5 to-neon-blanc/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};