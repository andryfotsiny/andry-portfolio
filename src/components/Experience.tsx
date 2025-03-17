'use client';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, TerminalSquare } from 'lucide-react';

export const Experience = () => {
    const experiences = [
        {
            id: 1,
            poste: "Développeur React Native",
            entreprise: "Relia Consulting",
            periode: "Août 2024 - Février 2025",
            description: "Refactoring et optimisation d'une application mobile (PokerApply) en React Native.",
            technologies: ["React Native", "TypeScript", "Redux", "API REST"]
        },
        {
            id: 2,
            poste: "Développeur Web",
            entreprise: "CHU Fianarantsoa",
            periode: "Juillet 2022 - Septembre 2022",
            description: "Conception et mise en place d'un site web pour le CHU Fianarantsoa.",
            technologies: ["PHP", "MySQL", "HTML/CSS", "JavaScript"]
        },
        {
            id: 3,
            poste: "Développeur Java",
            entreprise: "CHU Fianarantsoa",
            periode: "Juin 2021 - Juillet 2021",
            description: "Développement d'une application de gestion des congés, absences et ordres de mission.",
            technologies: ["Java", "JavaFX", "SQL"]
        },
        {
            id: 4,
            poste: "Analyste de données",
            entreprise: "EMIT Fianarantsoa",
            periode: "Septembre 2023 - Décembre 2023",
            description: "Analyse de données satellitaires pour la gestion des ressources en eau.",
            technologies: ["QGIS", "Python", "Analyse spatiale"]
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
                        Expérience professionnelle
                    </motion.h2>

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
                                                <div className="w-3 h-3 rounded-full bg-neon-blanc animate-pulse"></div>
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
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Calendar className="w-4 h-4" />
                                                <span>{exp.periode}</span>
                                            </div>
                                        </div>

                                        <p className="mt-4 text-gray-300">{exp.description}</p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {exp.technologies.map((tech, i) => (
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
                </motion.div>
            </div>
        </div>
    );
};