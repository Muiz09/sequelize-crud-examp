const express = require('express')
const router = express.Router()
const routerProduct = require('./routerProduct')
const routerCategory = require('./routerCategory')

// PRODUCT
router.use('/', routerProduct)

// CATREGORY
router.use('/', routerCategory)

// 


module.exports = router