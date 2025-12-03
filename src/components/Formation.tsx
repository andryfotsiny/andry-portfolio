'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Loader2, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Formation {
    id: string;
    periode: string;
    titre: string;
    ecole: string;
    icon: string;
    description?: string;
    link?: string;
    order: number;
}

interface Certification {
    id: string;
    date: string;
    titre: string;
    organisme: string;
    icon: string;
    link?: string; // 👈 Nouveau champ
    order: number;
}

// Mapping des icônes
const iconMap: { [key: string]: any } = {
    GraduationCap: GraduationCap,
    BookOpen: BookOpen,
    Award: Award,
};

export const Formation = () => {
    const [formations, setFormations] = useState<Formation[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [formationsRes, certificationsRes] = await Promise.all([
                    fetch('/api/formation'),
                    fetch('/api/certification')
                ]);

                if (!formationsRes.ok || !certificationsRes.ok) {
                    throw new Error('Erreur lors du chargement des données');
                }

                const formationsData = await formationsRes.json();
                const certificationsData = await certificationsRes.json();

                setFormations(formationsData);
                setCertifications(certificationsData);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Impossible de charger les données');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getIcon = (iconName: string) => {
        const IconComponent = iconMap[iconName] || GraduationCap;
        return <IconComponent className="w-8 h-8 text-neon-blanc" />;
    };

    const getCertificationIcon = (iconName: string) => {
        const IconComponent = iconMap[iconName] || Award;
        return <IconComponent className="w-6 h-6 text-neon-green" />;
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
                    <p className="text-neon-blue text-xl">Chargement des formations...</p>
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

                            {formations.length === 0 ? (
                                <p className="text-gray-400 text-center py-8">
                                    Aucune formation pour le moment
                                </p>
                            ) : (
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
                                                {getIcon(formation.icon)}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-neon-blanc">{formation.periode}</p>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h4 className="text-lg font-military text-neon-blanc">{formation.titre}</h4>
                                                    {formation.link && (
                                                        <a
                                                            href={formation.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 text-neon-blue hover:text-neon-blanc transition-colors text-sm"
                                                            title="Voir le certificat"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                            <span>Voir le lien</span>
                                                        </a>
                                                    )}
                                                </div>
                                                <p className="text-gray-400">{formation.ecole}</p>
                                                {formation.description && (
                                                    <p className="text-sm text-gray-300 mt-1">{formation.description}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
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

                            {certifications.length === 0 ? (
                                <p className="text-gray-400 text-center py-8">
                                    Aucune certification pour le moment
                                </p>
                            ) : (
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
                                            {getCertificationIcon(certification.icon)}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h4 className="font-military text-neon-blanc">{certification.titre}</h4>
                                                    {certification.link && (
                                                        <a
                                                            href={certification.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 text-neon-green hover:text-neon-blanc transition-colors text-xs"
                                                            title="Voir le certificat"
                                                        >
                                                            <ExternalLink className="w-3 h-3" />
                                                            <span>Lien</span>
                                                        </a>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-400">
                                                    {certification.organisme} - {certification.date}
                                                </p>
                                            </div>
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