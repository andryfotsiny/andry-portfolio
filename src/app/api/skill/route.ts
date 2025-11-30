import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer toutes les compétences
export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            include: {
                category: true
            },
            orderBy: { order: 'asc' }
        });

        return NextResponse.json(skills);
    } catch (error) {
        console.error('Error fetching skills:', error);
        return NextResponse.json(
            { error: 'Failed to fetch skills' },
            { status: 500 }
        );
    }
}

// POST - Créer une nouvelle compétence
export async function POST(request: Request) {
    try {
        const data = await request.json();

        const skill = await prisma.skill.create({
            data: {
                name: data.name,
                categoryId: data.categoryId,
                order: data.order || 0,
            },
            include: {
                category: true
            }
        });

        return NextResponse.json(skill, { status: 201 });
    } catch (error) {
        console.error('Error creating skill:', error);
        return NextResponse.json(
            { error: 'Failed to create skill' },
            { status: 500 }
        );
    }
}

// PUT - Mettre à jour une compétence
export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;

        if (!id) {
            return NextResponse.json(
                { error: 'Skill ID is required' },
                { status: 400 }
            );
        }

        const skill = await prisma.skill.update({
            where: { id },
            data: updateData,
            include: {
                category: true
            }
        });

        return NextResponse.json(skill);
    } catch (error) {
        console.error('Error updating skill:', error);
        return NextResponse.json(
            { error: 'Failed to update skill' },
            { status: 500 }
        );
    }
}

// DELETE - Supprimer une compétence
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Skill ID is required' },
                { status: 400 }
            );
        }

        await prisma.skill.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Skill deleted successfully' });
    } catch (error) {
        console.error('Error deleting skill:', error);
        return NextResponse.json(
            { error: 'Failed to delete skill' },
            { status: 500 }
        );
    }
}