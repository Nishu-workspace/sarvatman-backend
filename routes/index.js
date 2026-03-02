import express from 'express';

import publicRoutes from "../routes/public.routes.js";
import inquiryRoutes from "../routes/inquiry.routes.js";
import adminRoutes from "../routes/admin.routes.js";

const router = express.Router();

router.use("/products",publicRoutes);

router.use("/inquiries",inquiryRoutes);

router.use("/admin",adminRoutes);

export default router;