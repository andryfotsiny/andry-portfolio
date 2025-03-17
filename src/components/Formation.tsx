'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export const Formation = () => {
    const formations = [
        {
            id: 1,
            periode: '2023-2024',
            titre: 'Master 2 en Ingénierie Informatique',
            ecole: 'EMIT Fianarantsoa',
            icon: <GraduationCap className="w-8 h-8 text-neon-blanc" />
        },
        {
            id: 2,
            periode: '2021-2022',
            titre: 'Licence en Informatique',
            ecole: 'EMIT Fianarantsoa',
            icon: <GraduationCap className="w-8 h-8 text-neon-blanc" />
        },
        {
            id: 3,
            periode: '2017-2018',
            titre: 'Baccalauréat série D',
            ecole: 'LRR Fianarantsoa',
            icon: <BookOpen className="w-8 h-8 text-neon-blanc" />
        }
    ];

    const certifications = [
        {
            id: 1,
            date: '2024',
            titre: 'Certificat en Langage Python',
            organisme: 'HackerRank',
            icon: <Award className="w-6 h-6 text-neon-green" />
        },
        {
            id: 2,
            date: '2024',
            titre: 'Certificat en SQL',
            organisme: 'HackerRank',
            icon: <Award className="w-6 h-6 text-neon-green" />
        },
        {
            id: 3,
            date: '2024',
            titre: 'Certificat en ReactJs',
            organisme: 'SkillValue',
            icon: <Award className="w-6 h-6 text-neon-green" />
        },
        {
            id: 4,
            date: '2024',
            titre: 'Certificat en PHP (Laravel)',
            organisme: 'SkillValue',
            icon: <Award className="w-6 h-6 text-neon-green" />
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
                        Formation
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Parcours académique */}
                        <motion.div
                            className="tech-border"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-2xl font-military neon-text mb-4">Parcours académique</h3>
                            <div className="flex flex-col gap-6">
                                {formations.map((formation, index) => (
                                    <motion.div
                                        key={formation.id}
                                        className="flex items-start gap-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                    >
                                        <div className="bg-dark-gray p-2 rounded-lg">
                                            {formation.icon}
                                        </div>
                                        <div>
                                            <p className="text-neon-blanc">{formation.periode}</p>
                                            <h4 className="text-lg font-military">{formation.titre}</h4>
                                            <p className="text-gray-400">{formation.ecole}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="scan-line" />
                        </motion.div>

                        {/* Certifications */}
                        <motion.div
                            className="tech-border"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-2xl font-military neon-text mb-4">Certifications</h3>
                            <div className="flex flex-col gap-4">
                                {certifications.map((certification, index) => (
                                    <motion.div
                                        key={certification.id}
                                        className="flex items-center gap-3 p-3 rounded-md bg-dark-gray/50"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                    >
                                        {certification.icon}
                                        <div>
                                            <h4 className="font-military text-neon-blanc">{certification.titre}</h4>
                                            <p className="text-sm text-gray-400">{certification.organisme} - {certification.date}</p>
                                        </div>
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