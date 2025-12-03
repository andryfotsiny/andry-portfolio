'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface ProfileData {
    email: string;
    phone?: string;
    location?: string;
    githubUrl?: string;
    linkedinUrl?: string;
}

export const Contact = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState<{
        isSubmitting: boolean;
        isSubmitted: boolean;
        isError: boolean;
        message?: string;
    }>({
        isSubmitting: false,
        isSubmitted: false,
        isError: false,
        message: undefined
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/profile');
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    // Valeurs par défaut si pas de profil
    const displayProfile = profile || {
        email: 'Andryfotsiny1410@gmail.com',
        phone: '+261 34 27 583 01',
        location: 'Fianarantsoa, Madagascar',
        githubUrl: 'https://github.com/andryfotsiny',
        linkedinUrl: 'https://www.linkedin.com/in/jean-michel-andrianantenaina-483056304'
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus({ isSubmitting: true, isSubmitted: false, isError: false });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erreur lors de l\'envoi du message');
            }

            setFormStatus({
                isSubmitting: false,
                isSubmitted: true,
                isError: false,
                message: data.message
            });
            setFormData({ name: '', email: '', message: '' });

            setTimeout(() => {
                setFormStatus({
                    isSubmitting: false,
                    isSubmitted: false,
                    isError: false
                });
            }, 10000);

        } catch (error: any) {
            console.error('Error:', error);
            setFormStatus({
                isSubmitting: false,
                isSubmitted: false,
                isError: true,
                message: error.message
            });

            setTimeout(() => {
                setFormStatus({
                    isSubmitting: false,
                    isSubmitted: false,
                    isError: false
                });
            }, 5000);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-16 px-6">
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
                        Contact
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Informations de contact */}
                        <motion.div
                            className="tech-border"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-2xl font-military neon-text mb-6">Coordonnées</h3>

                            <div className="flex flex-col gap-6">
                                <motion.div
                                    className="flex items-center gap-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="p-3 rounded-lg bg-dark-gray text-neon-blanc">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-military text-gray-300">Email</h4>
                                        <a href={`mailto:${displayProfile.email}`} className="text-neon-blanc hover:underline">
                                            {displayProfile.email}
                                        </a>
                                    </div>
                                </motion.div>

                                {displayProfile.phone && (
                                    <motion.div
                                        className="flex items-center gap-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <div className="p-3 rounded-lg bg-dark-gray text-neon-blanc">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-military text-gray-300">Téléphone</h4>
                                            <a href={`tel:${displayProfile.phone.replace(/\s/g, '')}`} className="text-neon-blanc hover:underline">
                                                {displayProfile.phone}
                                            </a>
                                        </div>
                                    </motion.div>
                                )}

                                {displayProfile.location && (
                                    <motion.div
                                        className="flex items-center gap-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <div className="p-3 rounded-lg bg-dark-gray text-neon-blanc">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-military text-gray-300">Localisation</h4>
                                            <p className="text-neon-blanc">
                                                {displayProfile.location}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {displayProfile.githubUrl && (
                                    <motion.div
                                        className="flex items-center gap-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <div className="p-3 rounded-lg bg-dark-gray text-neon-blanc">
                                            <Github className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-military text-gray-300">GitHub</h4>
                                            <a href={displayProfile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-neon-blanc hover:underline truncate block">
                                                {displayProfile.githubUrl}
                                            </a>
                                        </div>
                                    </motion.div>
                                )}

                                {displayProfile.linkedinUrl && (
                                    <motion.div
                                        className="flex items-center gap-4"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <div className="p-3 rounded-lg bg-dark-gray text-neon-blanc">
                                            <Linkedin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-military text-gray-300">LinkedIn</h4>
                                            <a href={displayProfile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-neon-blanc hover:underline truncate block">
                                                {displayProfile.linkedinUrl}
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Formulaire de contact */}
                        <motion.div
                            className="tech-border"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-2xl font-military neon-text mb-6">Envoyez-moi un message</h3>

                            {formStatus.isSubmitted ? (
                                <motion.div
                                    className="p-6 border border-neon-green bg-neon-green/10 rounded-lg"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-neon-green flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-lg font-military text-neon-green mb-2">Message envoyé avec succès!</p>
                                            <p className="text-gray-300">{formStatus.message || 'Merci de m\'avoir contacté. Je vous répondrai dans les plus brefs délais.'}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : formStatus.isError ? (
                                <motion.div
                                    className="p-6 border border-red-500 bg-red-500/10 rounded-lg"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-lg font-military text-red-400 mb-2">Erreur d&#39;envoi</p>
                                            <p className="text-gray-300">{formStatus.message || 'Une erreur est survenue. Veuillez réessayer.'}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-gray-300">
                                            Nom *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            minLength={2}
                                            maxLength={100}
                                            disabled={formStatus.isSubmitting}
                                            className="w-full p-3 bg-dark-gray border border-gray-600 rounded-lg focus:outline-none focus:border-neon-blanc text-white disabled:opacity-50"
                                            placeholder="Votre nom"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-gray-300">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            disabled={formStatus.isSubmitting}
                                            className="w-full p-3 bg-dark-gray border border-gray-600 rounded-lg focus:outline-none focus:border-neon-blanc text-white disabled:opacity-50"
                                            placeholder="votre.email@exemple.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block mb-2 text-gray-300">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            minLength={10}
                                            maxLength={2000}
                                            rows={5}
                                            disabled={formStatus.isSubmitting}
                                            className="w-full p-3 bg-dark-gray border border-gray-600 rounded-lg focus:outline-none focus:border-neon-blanc text-white resize-none disabled:opacity-50"
                                            placeholder="Votre message (minimum 10 caractères)"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formData.message.length} / 2000 caractères
                                        </p>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className="mt-4 px-6 py-3 bg-dark-gray border border-neon-blanc text-neon-blanc rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        whileHover={formStatus.isSubmitting ? {} : { scale: 1.05 }}
                                        whileTap={formStatus.isSubmitting ? {} : { scale: 0.95 }}
                                        disabled={formStatus.isSubmitting}
                                    >
                                        {formStatus.isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Envoyer
                                            </>
                                        )}
                                    </motion.button>

                                    <p className="text-xs text-gray-500 text-center mt-2">
                                        * Champs obligatoires • Vous recevrez un email de confirmation
                                    </p>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;