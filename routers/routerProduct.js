const express = require('express')
const router = express.Router()
const Controller = require("../controllers/controllerProduct");

// ABOUT PRODUCT
router.get('/product', Controller.readProduct) // GET ALL PRODUCT AND INCLUDE CATEGORY, SUPPLIER
router.get('/product/:id', Controller.productDetail) // GET DETAIL ONE PRODUCT
router.post('/product', Controller.addProduct) // CREATE PRODUCT 
router.put('/product/:id', Controller.editProduct) // EDIT PRODUCT
router.delete('/product/:id', Controller.deleteProduct) // DELETE PRODUCT

module.exports = router