const express = require('express')
const router = express.Router()
const routerProduct = require('./routerProduct')
const routerCategory = require('./routerCategory')
const routerSeller = require('./routerSeller')

// PRODUCT
router.use('/', routerProduct)

// CATREGORY
router.use('/', routerCategory)

// Seller
router.use('/', routerSeller)

module.exports = router