import { SignJWT, jwtVerify } from 'jose';

// Credentials hard-codés (pour simplifier)
export const ADMIN_CREDENTIALS = {
    email: 'andryfotsiny1410@gmail.com',
    password: 'Michel,1410.',
};

// Secret pour JWT (en production, utiliser une variable d'environnement)
const SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'votre-secret-super-securise-changez-moi-en-production'
);

export interface SessionData {
    email: string;
    isAdmin: boolean;
}

// Créer un token JWT
export async function createToken(data: SessionData): Promise<string> {
    return await new SignJWT(data)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(SECRET);
}

// Vérifier un token JWT
export async function verifyToken(token: string): Promise<SessionData | null> {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload as SessionData;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

// Vérifier les credentials
export function checkCredentials(email: string, password: string): boolean {
    return (
        email === ADMIN_CREDENTIALS.email &&
        password === ADMIN_CREDENTIALS.password
    );
}