const express = require('express')
const router = express.Router()
const Controller = require("../controllers/controllerSeller");

// ABOUT Seller
router.get('/seller', Controller.readSeller) // GET ALL PRODUCT AND INCLUDE CATEGORY, SUPPLIER
router.get('/seller/:id', Controller.sellerDetail) // GET DETAIL SELLER
router.post('/seller', Controller.addSeller) // CREATE SELLER 
router.put('/seller/:id', Controller.editSeller) // EDIT PRODUCT
// router.delete('/seller/:id', Controller.deleteProduct) // DELETE PRODUCT

module.exports = router