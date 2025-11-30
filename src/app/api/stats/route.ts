import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const stats = await prisma.stats.findFirst({
            orderBy: { updatedAt: 'desc' }
        });

        // If no stats exist, calculate them
        if (!stats) {
            const projectsCount = await prisma.project.count();
            const skillsCount = await prisma.skill.count();

            const newStats = await prisma.stats.create({
                data: {
                    projectsCount,
                    skillsCount,
                    yearsExp: 2,
                }
            });

            return NextResponse.json(newStats);
        }

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        const existingStats = await prisma.stats.findFirst();

        if (!existingStats) {
            const stats = await prisma.stats.create({
                data: {
                    projectsCount: data.projectsCount || 0,
                    yearsExp: data.yearsExp || 0,
                    skillsCount: data.skillsCount || 0,
                }
            });
            return NextResponse.json(stats);
        }

        const stats = await prisma.stats.update({
            where: { id: existingStats.id },
            data: {
                projectsCount: data.projectsCount,
                yearsExp: data.yearsExp,
                skillsCount: data.skillsCount,
            }
        });

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error updating stats:', error);
        return NextResponse.json(
            { error: 'Failed to update stats' },
            { status: 500 }
        );
    }
}