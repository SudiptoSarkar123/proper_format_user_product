import express from "express"
const router = express.Router()
import ProductController from '../controller/product.controller.js'


router.post('/products/category',ProductController.createCategory)
router.post('/products',ProductController.createProduct)
router.get('/products/:id',ProductController.getProduct)
router.put('/products/:id',ProductController.updateProduct)


export default router 