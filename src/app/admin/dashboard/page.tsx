'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    GraduationCap,
    Briefcase,
    Folder,
    Mail,
    Loader2,
    TrendingUp
} from 'lucide-react';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        formations: 0,
        experiences: 0,
        projects: 0,
        messages: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [formationsRes, experiencesRes, projectsRes, messagesRes] = await Promise.all([
                fetch('/api/formation'),
                fetch('/api/experience'),
                fetch('/api/projects'),
                fetch('/api/contact'),
            ]);

            const [formations, experiences, projects, messages] = await Promise.all([
                formationsRes.json(),
                experiencesRes.json(),
                projectsRes.json(),
                messagesRes.json(),
            ]);

            setStats({
                formations: formations.length || 0,
                experiences: experiences.length || 0,
                projects: projects.length || 0,
                messages: messages.length || 0,
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
            </div>
        );
    }

    const statsCards = [
        {
            label: 'Formations',
            value: stats.formations,
            icon: GraduationCap,
            color: 'from-cyan-400 to-blue-600',
            href: '/admin/formation'
        },
        {
            label: 'Expériences',
            value: stats.experiences,
            icon: Briefcase,
            color: 'from-green-400 to-emerald-600',
            href: '/admin/experience'
        },
        {
            label: 'Projets',
            value: stats.projects,
            icon: Folder,
            color: 'from-purple-400 to-pink-600',
            href: '/admin/projects'
        },
        {
            label: 'Messages',
            value: stats.messages,
            icon: Mail,
            color: 'from-orange-400 to-red-600',
            href: '/admin/messages'
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
                <p className="text-slate-400">Vue d&#39;ensemble de votre portfolio</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                    <motion.a
                        key={stat.label}
                        href={stat.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-3xl font-bold text-white">{stat.value}</span>
                        </div>
                        <p className="text-slate-400">{stat.label}</p>
                    </motion.a>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    Actions rapides
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Formation */}
                    <a
                        href="/admin/formation"
                        className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-center group"
                    >
                        <GraduationCap className="w-8 h-8 text-cyan-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-white font-medium">Gérer Formations</p>
                        <p className="text-sm text-slate-400 mt-1">{stats.formations} formations</p>
                    </a>

                    {/* Projects */}
                    <a
                        href="/admin/projects"
                        className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-center group"
                    >
                        <Folder className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-white font-medium">Gérer Projets</p>
                        <p className="text-sm text-slate-400 mt-1">{stats.projects} projets</p>
                    </a>

                    {/* Messages */}
                    <a
                        href="/admin/messages"
                        className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-center group"
                    >
                        <Mail className="w-8 h-8 text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-white font-medium">Voir Messages</p>
                        <p className="text-sm text-slate-400 mt-1">{stats.messages} messages</p>
                    </a>

                </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-lg p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-cyan-400" />
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-white mb-2">Portfolio dynamique</h4>
                        <p className="text-slate-300">
                            Toutes vos modifications sont automatiquement synchronisées avec votre portfolio public.
                            Les visiteurs voient les données en temps réel.
                        </p>
                    </div>
                </div>
            </div>

        </motion.div>
    );
}
