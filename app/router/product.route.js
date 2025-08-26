import express from "express"
const router = express.Router()
import ProductController from '../controller/product.controller.js'


router.post('/category',ProductController.createCategory)
router.post('/',ProductController.createProduct)
router.get('/:id',ProductController.getProduct)
router.put('/:id',ProductController.updateProduct)
router.put('/assign/:id/:productId',ProductController.assingProductToUser)
router.put('/image/:id',ProductController.updateProductImage)


export default router 