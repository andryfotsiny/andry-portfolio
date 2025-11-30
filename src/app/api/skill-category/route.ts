import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer toutes les catégories avec leurs compétences
export async function GET() {
    try {
        const categories = await prisma.skillCategory.findMany({
            include: {
                skills: {
                    orderBy: { order: 'asc' }
                }
            },
            orderBy: { order: 'asc' }
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching skill categories:', error);
        return NextResponse.json(
            { error: 'Failed to fetch skill categories' },
            { status: 500 }
        );
    }
}

// POST - Créer une nouvelle catégorie
export async function POST(request: Request) {
    try {
        const data = await request.json();

        const category = await prisma.skillCategory.create({
            data: {
                name: data.name,
                icon: data.icon || 'Code',
                order: data.order || 0,
            }
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error('Error creating skill category:', error);
        return NextResponse.json(
            { error: 'Failed to create skill category' },
            { status: 500 }
        );
    }
}

// PUT - Mettre à jour une catégorie
export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;

        if (!id) {
            return NextResponse.json(
                { error: 'Category ID is required' },
                { status: 400 }
            );
        }

        const category = await prisma.skillCategory.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(category);
    } catch (error) {
        console.error('Error updating skill category:', error);
        return NextResponse.json(
            { error: 'Failed to update skill category' },
            { status: 500 }
        );
    }
}

// DELETE - Supprimer une catégorie (et ses compétences avec CASCADE)
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Category ID is required' },
                { status: 400 }
            );
        }

        await prisma.skillCategory.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Skill category deleted successfully' });
    } catch (error) {
        console.error('Error deleting skill category:', error);
        return NextResponse.json(
            { error: 'Failed to delete skill category' },
            { status: 500 }
        );
    }
}