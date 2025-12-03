import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer toutes les formations
export async function GET() {
    try {
        const formations = await prisma.formation.findMany({
            orderBy: { order: 'asc' }
        });

        return NextResponse.json(formations);
    } catch (error) {
        console.error('Error fetching formations:', error);
        return NextResponse.json(
            { error: 'Failed to fetch formations' },
            { status: 500 }
        );
    }
}

// POST - Créer une nouvelle formation
export async function POST(request: Request) {
    try {
        const data = await request.json();

        const formation = await prisma.formation.create({
            data: {
                periode: data.periode,
                titre: data.titre,
                ecole: data.ecole,
                icon: data.icon || 'GraduationCap',
                description: data.description,
                link: data.link, // 👈 Ajout du link
                order: data.order || 0,
            }
        });

        return NextResponse.json(formation, { status: 201 });
    } catch (error) {
        console.error('Error creating formation:', error);
        return NextResponse.json(
            { error: 'Failed to create formation' },
            { status: 500 }
        );
    }
}

// PUT - Mettre à jour une formation
export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;

        if (!id) {
            return NextResponse.json(
                { error: 'Formation ID is required' },
                { status: 400 }
            );
        }

        const formation = await prisma.formation.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(formation);
    } catch (error) {
        console.error('Error updating formation:', error);
        return NextResponse.json(
            { error: 'Failed to update formation' },
            { status: 500 }
        );
    }
}

// DELETE - Supprimer une formation
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Formation ID is required' },
                { status: 400 }
            );
        }

        await prisma.formation.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Formation deleted successfully' });
    } catch (error) {
        console.error('Error deleting formation:', error);
        return NextResponse.json(
            { error: 'Failed to delete formation' },
            { status: 500 }
        );
    }
}