'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState({
        isSubmitting: false,
        isSubmitted: false,
        isError: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus({ isSubmitting: true, isSubmitted: false, isError: false });

        // Simulation d'envoi du formulaire
        setTimeout(() => {
            setFormStatus({ isSubmitting: false, isSubmitted: true, isError: false });
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
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
                                        <a href="mailto:Andryfotsiny1410@gmail.com" className="text-neon-blanc hover:underline">
                                            Andryfotsiny1410@gmail.com
                                        </a>
                                    </div>
                                </motion.div>

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
                                        <a href="tel:+261342758301" className="text-neon-blanc hover:underline">
                                            +261 34 27 583 01
                                        </a>
                                    </div>
                                </motion.div>

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
                                            Fianarantsoa, Madagascar
                                        </p>
                                    </div>
                                </motion.div>

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
                                        <a href="https://github.com/andryfotsiny" target="_blank" rel="noopener noreferrer" className="text-neon-blanc hover:underline">
                                            github.com/andryfotsiny
                                        </a>
                                    </div>
                                </motion.div>

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
                                        <a href="www.linkedin.com/in/jean-michel-andrianantenaina-483056304" target="_blank" rel="noopener noreferrer" className="text-neon-blanc hover:underline">
                                            linkedin.com/Andry
                                        </a>
                                    </div>
                                </motion.div>
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
                                    className="p-4 border border-neon-vert bg-dark-gray text-neon-vert rounded-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <p className="text-lg font-military">Message envoyé avec succès!</p>
                                    <p>Merci de m&#39;avoir contacté. Je vous répondrai dans les plus brefs délais.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-gray-300">
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-3 bg-dark-gray border border-gray-600 rounded-lg focus:outline-none focus:border-neon-blanc text-white"
                                            placeholder="Votre nom"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-gray-300">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-3 bg-dark-gray border border-gray-600 rounded-lg focus:outline-none focus:border-neon-blanc text-white"
                                            placeholder="Votre email"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block mb-2 text-gray-300">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full p-3 bg-dark-gray border border-gray-600 rounded-lg focus:outline-none focus:border-neon-blanc text-white resize-none"
                                            placeholder="Votre message"
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className="mt-4 px-6 py-3 bg-dark-gray border border-neon-blanc text-neon-blanc rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        disabled={formStatus.isSubmitting}
                                    >
                                        {formStatus.isSubmitting ? (
                                            'Envoi en cours...'
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Envoyer
                                            </>
                                        )}
                                    </motion.button>
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