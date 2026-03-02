import express from 'express';
import { upload } from '../config/cloudinary.js';
import authAdmin from '../middlewares/authAdmin.js';

const router = express.Router();

router.post('/', authAdmin, upload.single('file'), async (req, res) => {
    console.log("i am in upload.routes", req.file)
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        res.status(200).json({
            success: true,
            url: req.file.path,
            public_id: req.file.filename
        });
    } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({ success: false, message: 'Server error during upload' });
    }
});

export default router;
