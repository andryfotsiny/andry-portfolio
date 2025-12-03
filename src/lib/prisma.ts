// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    })

// Graceful shutdown
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma

    // Gérer les déconnexions proprement
    process.on('beforeExit', async () => {
        await prisma.$disconnect()
    })
}

export default prisma