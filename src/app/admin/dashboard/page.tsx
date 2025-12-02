'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    GraduationCap,
    Briefcase,
    Folder,
    Code,
    Mail,
    LogOut,
    Loader2
} from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/session');
            if (!response.ok) {
                router.push('/admin/login');
                return;
            }
            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            router.push('/admin/login');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
        );
    }

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: true },
        { icon: GraduationCap, label: 'Formation', href: '/admin/formation' },
        { icon: Briefcase, label: 'Expérience', href: '/admin/experience' },
        { icon: Folder, label: 'Projets', href: '/admin/projects' },
        { icon: Code, label: 'Compétences', href: '/admin/skills' },
        { icon: Mail, label: 'Messages', href: '/admin/messages' },
    ];

    const stats = [
        { label: 'Formations', value: '3', icon: GraduationCap, color: 'from-cyan-400 to-blue-600' },
        { label: 'Expériences', value: '4', icon: Briefcase, color: 'from-green-400 to-emerald-600' },
        { label: 'Projets', value: '4', icon: Folder, color: 'from-purple-400 to-pink-600' },
        { label: 'Messages', value: '0', icon: Mail, color: 'from-orange-400 to-red-600' },
    ];

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-slate-800 border-r border-slate-700 p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg" />
                        Admin
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">{user?.email}</p>
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                item.active
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Déconnexion</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
                    <p className="text-slate-400 mb-8">Vue d'ensemble de votre portfolio</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-800 border border-slate-700 rounded-lg p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                                </div>
                                <p className="text-slate-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Actions rapides</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <a
                                href="/admin/formation"
                                className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-center"
                            >
                                <GraduationCap className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                                <p className="text-white font-medium">Gérer Formations</p>
                            </a>
                            <a
                                href="/admin/projects"
                                className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-center"
                            >
                                <Folder className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                <p className="text-white font-medium">Gérer Projets</p>
                            </a>
                            <a
                                href="/admin/messages"
                                className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-center"
                            >
                                <Mail className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                                <p className="text-white font-medium">Voir Messages</p>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}