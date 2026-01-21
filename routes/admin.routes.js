import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import {
    updateProduct,
    deleteProduct,
    createProduct,
    getAllProducts,
    getAllProductsAdmin
} from "../controllers/productController.js";
import{
    getInquiry,
    updateInquiryStatus,
   

} from "../controllers/inquiryController.js" ;

import authAdmin from "../middlewares/authAdmin.js";

const router = express.Router();

router.post("/login", adminLogin);

router.use(authAdmin);

router.post("/products", createProduct);
router.get("/", getAllProducts)
router.get("/getall",getAllProductsAdmin)
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/inquiries",getInquiry);
router.put("/inquiries/:id",updateInquiryStatus);

export default router;