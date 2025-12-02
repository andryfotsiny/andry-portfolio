import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token');

        if (!token) {
            return NextResponse.json(
                { isAuthenticated: false },
                { status: 401 }
            );
        }

        const session = await verifyToken(token.value);

        if (!session) {
            return NextResponse.json(
                { isAuthenticated: false },
                { status: 401 }
            );
        }

        return NextResponse.json({
            isAuthenticated: true,
            user: session,
        });
    } catch (error) {
        console.error('Session check error:', error);
        return NextResponse.json(
            { isAuthenticated: false },
            { status: 401 }
        );
    }
}