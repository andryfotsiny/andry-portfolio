'use client';
import { motion } from 'framer-motion';
import { Code2, Terminal } from 'lucide-react';

export const Projects = () => {
    const projects = [
        {
            id: 1,
            titre: "youtube-downloader",
            description: "Site web de téléchargement de vidéos YouTube avec interface utilisateur intuitive.",
            technologies: ["TypeScript", "React", "Node.js", "Express"]
        },
        {
            id: 2,
            titre: "TradingBot",
            description: "Bot de trading automatisé analysant les marchés et exécutant des ordres selon des stratégies prédéfinies.",
            technologies: ["Python", "TensorFlow", "API Trading", "Pandas"]
        },
        {
            id: 3,
            titre: "Globalinfo",
            description: "Application de gestion de vente avec suivi de stock, facturation et reporting.",
            technologies: ["C#", ".NET", "SQL Server", "WPF"]
        },
        {
            id: 4,
            titre: "screensite",
            description: "Application sous licence MIT permettant de capturer un site web et de le convertir en code.",
            technologies: ["Python", "Selenium", "BeautifulSoup", "Flask"]
        }
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
                        Projets Personnels
                    </motion.h2>

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
                                {/* Informations du projet */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Code2 className="w-5 h-5 text-neon-blanc" />
                                        <h3 className="text-xl font-military neon-text">{project.titre}</h3>
                                    </div>

                                    <p className="text-gray-300 mb-4">{project.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 rounded-full bg-neon-blanc/10 text-neon-blanc text-xs flex items-center gap-1"
                                            >
                                                <Terminal className="w-3 h-3" />
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="scan-line" />

                                {/* Effet de lueur au survol */}
                                <div className="absolute inset-0 bg-gradient-to-r from-neon-blanc/0 via-neon-blanc/5 to-neon-blanc/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};