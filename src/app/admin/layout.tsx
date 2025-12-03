'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import { useEffect, useState } from 'react';
import {
    LayoutDashboard,
    GraduationCap,
    Briefcase,
    Folder,
    Code,
    Mail,
    LogOut,
    Shield,
    Loader2,
    Menu,
    X,
    User
} from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (pathname === '/admin/login') {
            setIsLoading(false);
            return;
        }
        checkAuth();
    }, [pathname]);

    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/session');
            if (!response.ok) {
                router.push('/admin/login');
                return;
            }
        } catch  {
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

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
        );
    }

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
        { icon: User, label: 'Profil', href: '/admin/profile' },
        { icon: GraduationCap, label: 'Formation', href: '/admin/formation' },
        { icon: Briefcase, label: 'Expérience', href: '/admin/experience' },
        { icon: Folder, label: 'Projets', href: '/admin/projects' },
        { icon: Code, label: 'Compétences', href: '/admin/skills' },
        { icon: Mail, label: 'Messages', href: '/admin/messages' },
    ];

    return (
        <div className="min-h-screen bg-slate-900">

            {/* Bouton hamburger mobile */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
            >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay mobile */}
            {sidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-full w-64 bg-slate-800 border-r border-slate-700 p-6 z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        Admin
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">Jean Michel</p>
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                    isActive
                                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                        : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
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
            <main className="md:ml-64 p-4 md:p-8 pt-20 md:pt-8">
                {children}
            </main>

            <Toaster />
        </div>
    );
}