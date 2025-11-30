import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendAdminNotification, sendUserConfirmation } from '@/lib/email';

// Rate limiting simple en mémoire
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const limit = rateLimitMap.get(ip);

    if (!limit || now > limit.resetTime) {
        // Nouveau ou expiré : autoriser et réinitialiser
        rateLimitMap.set(ip, {
            count: 1,
            resetTime: now + 60 * 60 * 1000, // 1 heure
        });
        return true;
    }

    if (limit.count >= 3) {
        // Limite atteinte
        return false;
    }

    // Incrémenter le compteur
    limit.count += 1;
    return true;
}

function getClientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    return ip;
}

// POST - Envoyer un message de contact
export async function POST(request: Request) {
    try {
        // 1. Vérifier le rate limiting
        const ip = getClientIp(request);
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                {
                    error: 'Trop de messages envoyés. Veuillez réessayer dans une heure.',
                    code: 'RATE_LIMIT_EXCEEDED'
                },
                { status: 429 }
            );
        }

        // 2. Récupérer et valider les données
        const data = await request.json();
        const { name, email, message } = data;

        // Validation basique
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Tous les champs sont requis' },
                { status: 400 }
            );
        }

        if (name.length < 2 || name.length > 100) {
            return NextResponse.json(
                { error: 'Le nom doit contenir entre 2 et 100 caractères' },
                { status: 400 }
            );
        }

        // Validation email simple
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Email invalide' },
                { status: 400 }
            );
        }

        if (message.length < 10 || message.length > 2000) {
            return NextResponse.json(
                { error: 'Le message doit contenir entre 10 et 2000 caractères' },
                { status: 400 }
            );
        }

        // 3. Sauvegarder dans la base de données
        const contactMessage = await prisma.contactMessage.create({
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                message: message.trim(),
                read: false,
            },
        });

        console.log('✅ Message sauvegardé en DB:', contactMessage.id);

        // 4. Envoyer les emails (ne pas bloquer si ça échoue)
        let emailStatus = {
            admin: false,
            user: false,
            adminError: null as string | null,
            userError: null as string | null,
        };

        // Envoyer email à l'admin (vous)
        try {
            await sendAdminNotification(name, email, message);
            emailStatus.admin = true;
            console.log('✅ Email envoyé à l\'admin');
        } catch (error: any) {
            console.error('❌ Erreur envoi email admin:', error);
            emailStatus.adminError = error.message;
        }

        // Envoyer email de confirmation à l'utilisateur
        try {
            await sendUserConfirmation(name, email);
            emailStatus.user = true;
            console.log('✅ Email de confirmation envoyé à l\'utilisateur');
        } catch (error: any) {
            console.error('❌ Erreur envoi email utilisateur:', error);
            emailStatus.userError = error.message;
        }

        // 5. Retourner la réponse selon le statut
        if (emailStatus.admin && emailStatus.user) {
            return NextResponse.json({
                success: true,
                message: 'Message envoyé avec succès ! Un email de confirmation vous a été envoyé.',
                messageId: contactMessage.id,
            });
        } else if (!emailStatus.admin && !emailStatus.user) {
            return NextResponse.json({
                success: true,
                message: 'Message enregistré mais les emails n\'ont pas pu être envoyés. Je vous contacterai dès que possible.',
                messageId: contactMessage.id,
                warning: 'Emails non envoyés',
            });
        } else {
            return NextResponse.json({
                success: true,
                message: 'Message envoyé avec succès !',
                messageId: contactMessage.id,
                emailStatus,
            });
        }

    } catch (error: any) {
        console.error('❌ Erreur complète:', error);
        return NextResponse.json(
            {
                error: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

// GET - Récupérer tous les messages (pour le futur dashboard)
export async function GET() {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}

// PUT - Marquer un message comme lu
export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, read } = data;

        if (!id) {
            return NextResponse.json(
                { error: 'Message ID is required' },
                { status: 400 }
            );
        }

        const message = await prisma.contactMessage.update({
            where: { id },
            data: { read: read ?? true },
        });

        return NextResponse.json(message);
    } catch (error) {
        console.error('Error updating message:', error);
        return NextResponse.json(
            { error: 'Failed to update message' },
            { status: 500 }
        );
    }
}

// DELETE - Supprimer un message
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Message ID is required' },
                { status: 400 }
            );
        }

        await prisma.contactMessage.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        return NextResponse.json(
            { error: 'Failed to delete message' },
            { status: 500 }
        );
    }
}