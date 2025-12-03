import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer toutes les certifications
export async function GET() {
    try {
        const certifications = await prisma.certification.findMany({
            orderBy: { order: 'asc' }
        });

        return NextResponse.json(certifications);
    } catch (error) {
        console.error('Error fetching certifications:', error);
        return NextResponse.json(
            { error: 'Failed to fetch certifications' },
            { status: 500 }
        );
    }
}

// POST - Créer une nouvelle certification
export async function POST(request: Request) {
    try {
        const data = await request.json();

        const certification = await prisma.certification.create({
            data: {
                date: data.date,
                titre: data.titre,
                organisme: data.organisme,
                icon: data.icon || 'Award',
                link: data.link, // 👈 Ajout du link
                order: data.order || 0,
            }
        });

        return NextResponse.json(certification, { status: 201 });
    } catch (error) {
        console.error('Error creating certification:', error);
        return NextResponse.json(
            { error: 'Failed to create certification' },
            { status: 500 }
        );
    }
}

// PUT - Mettre à jour une certification
export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;

        if (!id) {
            return NextResponse.json(
                { error: 'Certification ID is required' },
                { status: 400 }
            );
        }

        const certification = await prisma.certification.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(certification);
    } catch (error) {
        console.error('Error updating certification:', error);
        return NextResponse.json(
            { error: 'Failed to update certification' },
            { status: 500 }
        );
    }
}

// DELETE - Supprimer une certification
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Certification ID is required' },
                { status: 400 }
            );
        }

        await prisma.certification.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Certification deleted successfully' });
    } catch (error) {
        console.error('Error deleting certification:', error);
        return NextResponse.json(
            { error: 'Failed to delete certification' },
            { status: 500 }
        );
    }
}