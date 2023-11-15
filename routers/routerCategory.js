const express = require('express')
const router = express.Router()
const Controller = require("../controllers/controllerCategory");

// ABOUT CATEGORY
router.get('/category', Controller.readCategory) // GET CATEGORY 
router.post('/category', Controller.addCategory) // CREATE CATEGORY
router.put('/category/:id', Controller.editCategory) // EDIT PRODUCT
router.delete('category/:id', Controller.deleteCategory) // DELETE CATEGORY

module.exports = router