import express from "express";
const router = express.Router();
import ProductController from "../controller/product.controller.js";
import upload from "../middleware/multer.middleware.js";

router.post("/category", ProductController.createCategory);
router.post("/", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);
router.put("/assign/:id/:productId", ProductController.assingProductToUser);
router.put("/:id/image",upload.single("image"),ProductController.updateProductImage);
router.get("/all", ProductController.getAllProducts);
router.get("/:id/one", ProductController.getProduct);

export default router;
