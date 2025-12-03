// src/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dh2adt1i',
    api_key: process.env.CLOUDINARY_API_KEY || '877647612645954',
    api_secret: process.env.CLOUDINARY_API_SECRET || '42-Ew1Axffiqp3WTdzhw1MVaowI',
});

export const uploadToCloudinary = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: 'portfolio/projects',
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result?.secure_url || '');
            }
        ).end(buffer);
    });
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
    await cloudinary.uploader.destroy(publicId);
};

export default cloudinary;