const express = require('express')
const router = express.Router()
const Controller = require("../controllers/controllerSeller");

// ABOUT Seller
router.get('/seller', Controller.readSeller) // GET ALL STORE
router.get('/seller/:id', Controller.sellerDetail) // GET DETAIL SELLER
router.post('/seller', Controller.addSeller) // CREATE SELLER 
router.put('/seller/:id', Controller.editSeller) // EDIT SELLER
router.delete('/seller/:id', Controller.deleteSeller) // DELETE SELLER

module.exports = router