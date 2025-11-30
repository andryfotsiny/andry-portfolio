import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Récupérer tous les projets
export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { order: 'asc' }
        });

        return NextResponse.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

// POST - Créer un nouveau projet
export async function POST(request: Request) {
    try {
        const data = await request.json();

        const project = await prisma.project.create({
            data: {
                titre: data.titre,
                description: data.description,
                technologies: data.technologies, // JSON string
                githubUrl: data.githubUrl,
                liveUrl: data.liveUrl,
                imageUrl: data.imageUrl,
                featured: data.featured || false,
                order: data.order || 0,
            }
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        );
    }
}

// PUT - Mettre à jour un projet
export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;

        if (!id) {
            return NextResponse.json(
                { error: 'Project ID is required' },
                { status: 400 }
            );
        }

        const project = await prisma.project.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 500 }
        );
    }
}

// DELETE - Supprimer un projet
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Project ID is required' },
                { status: 400 }
            );
        }

        await prisma.project.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 500 }
        );
    }
}