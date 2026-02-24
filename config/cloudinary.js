import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Determine the folder based on file type
        let folderName = 'sarvatman/images';
        let resourceType = 'image';

        if (file.mimetype === 'application/pdf') {
            folderName = 'sarvatman/brochures';
            resourceType = 'raw';
        }

        return {
            folder: folderName,
            resource_type: resourceType,
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'pdf'],
            public_id: file.originalname.split('.')[0] + '-' + Date.now(),
        };
    }
});

export const upload = multer({ storage: storage });
export { cloudinary };
