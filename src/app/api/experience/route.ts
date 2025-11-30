import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer toutes les expériences
export async function GET() {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: { order: 'asc' }
        });

        return NextResponse.json(experiences);
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return NextResponse.json(
            { error: 'Failed to fetch experiences' },
            { status: 500 }
        );
    }
}

// POST - Créer une nouvelle expérience
export async function POST(request: Request) {
    try {
        const data = await request.json();

        const experience = await prisma.experience.create({
            data: {
                poste: data.poste,
                entreprise: data.entreprise,
                periode: data.periode,
                description: data.description,
                technologies: data.technologies, // JSON string
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                current: data.current || false,
                order: data.order || 0,
            }
        });

        return NextResponse.json(experience, { status: 201 });
    } catch (error) {
        console.error('Error creating experience:', error);
        return NextResponse.json(
            { error: 'Failed to create experience' },
            { status: 500 }
        );
    }
}

// PUT - Mettre à jour une expérience
export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;

        if (!id) {
            return NextResponse.json(
                { error: 'Experience ID is required' },
                { status: 400 }
            );
        }

        // Convertir les dates si présentes
        if (updateData.startDate) {
            updateData.startDate = new Date(updateData.startDate);
        }
        if (updateData.endDate) {
            updateData.endDate = new Date(updateData.endDate);
        }

        const experience = await prisma.experience.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(experience);
    } catch (error) {
        console.error('Error updating experience:', error);
        return NextResponse.json(
            { error: 'Failed to update experience' },
            { status: 500 }
        );
    }
}

// DELETE - Supprimer une expérience
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Experience ID is required' },
                { status: 400 }
            );
        }

        await prisma.experience.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Experience deleted successfully' });
    } catch (error) {
        console.error('Error deleting experience:', error);
        return NextResponse.json(
            { error: 'Failed to delete experience' },
            { status: 500 }
        );
    }
}