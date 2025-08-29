import express from 'express'
import staticController from '../controller/static.controller.js'
const router = express.Router() 


router.get('/login',staticController.loginPg)
router.get('/register',staticController.registerPg) 
router.get('/products',staticController.productList)

export default router
