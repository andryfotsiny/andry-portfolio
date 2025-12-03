import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const profile = await prisma.profile.findFirst({
            orderBy: { updatedAt: 'desc' }
        });

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json(
            { error: 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const profile = await prisma.profile.create({
            data: {
                name: data.name,
                title: data.title,
                description: data.description,
                email: data.email,
                phone: data.phone || '',
                location: data.location || '',
                photoUrl: data.photoUrl || '',
                githubUrl: data.githubUrl || '',
                linkedinUrl: data.linkedinUrl || '',
            }
        });

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error creating profile:', error);
        return NextResponse.json(
            { error: 'Failed to create profile' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();

        const existingProfile = await prisma.profile.findFirst();

        if (!existingProfile) {
            return NextResponse.json(
                { error: 'No profile found' },
                { status: 404 }
            );
        }

        const profile = await prisma.profile.update({
            where: { id: existingProfile.id },
            data: {
                name: data.name,
                title: data.title,
                description: data.description,
                email: data.email,
                phone: data.phone || '',
                location: data.location || '',
                photoUrl: data.photoUrl || '',
                githubUrl: data.githubUrl || '',
                linkedinUrl: data.linkedinUrl || '',
            }
        });

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}