import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        // Supprimer le cookie
        const cookieStore = await cookies();
        cookieStore.delete('auth-token');

        return NextResponse.json({
            success: true,
            message: 'Déconnexion réussie',
        });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la déconnexion' },
            { status: 500 }
        );
    }
}