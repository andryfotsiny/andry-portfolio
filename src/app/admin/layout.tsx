'use client';

import { usePathname, useRouter } from 'next/navigation';
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
    Loader2
} from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Ne pas vérifier l'auth sur la page de login
        if (pathname === '/admin/login') {
            setIsLoading(false);
            return;
        }

        // Vérifier l'auth pour les autres pages
        checkAuth();
    }, [pathname]);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/session');
            if (!response.ok) {
                router.push('/admin/login');
                return;
            }
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

    // Page de login : afficher directement
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Autres pages : vérifier l'auth
    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
        );
    }

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
        { icon: GraduationCap, label: 'Formation', href: '/admin/formation' },
        { icon: Briefcase, label: 'Expérience', href: '/admin/experience' },
        { icon: Folder, label: 'Projets', href: '/admin/projects' },
        { icon: Code, label: 'Compétences', href: '/admin/skills' },
        { icon: Mail, label: 'Messages', href: '/admin/messages' },
    ];

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-slate-800 border-r border-slate-700 p-6 z-50">
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
                            <a
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
                            </a>
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
            <main className="ml-64 p-8">
                {children}
            </main>

            <Toaster />
        </div>
    );
}