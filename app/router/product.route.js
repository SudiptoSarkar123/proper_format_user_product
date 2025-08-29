import express from "express";
const router = express.Router();
import ProductController from "../controller/product.controller.js";
import upload from "../middleware/multer.middleware.js";
import redisAllProducts from '../middleware/allProductRedis.js'

router.post("/category", ProductController.createCategory);
router.post("/", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);
router.put("/assign/:id/:productId", ProductController.assingProductToUser);
router.put("/:id/image",upload.single("image"),ProductController.updateProductImage);
router.get("/:id/one", ProductController.getProduct);
router.get("/all", redisAllProducts,ProductController.getAllProducts);

export default router;
