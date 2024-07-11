import express from "express";
import { checkToken, checkRoleAdmin } from "../services/functions.js";
import { upload, uploadImageProduct, createProduct, editProduct } from "../controllers/product.js";

const router = express.Router();

router.post('/upload-image', upload.array('image'), uploadImageProduct)
router.post('/create', createProduct)
router.put("/:id", editProduct)
router.delete("/:id", editProduct)

export default router