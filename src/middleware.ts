import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Permettre l'accès à la page de login
    if (pathname === '/admin/login') {
        return NextResponse.next();
    }

    // Vérifier le token pour toutes les routes /admin
    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get('auth-token');

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        const session = await verifyToken(token.value);

        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Token valide, continuer
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};