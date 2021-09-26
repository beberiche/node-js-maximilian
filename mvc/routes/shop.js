const path = require('path');

const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

const pathHelper = require('../utils/pathHelper');

const adminData = require('./admin');

router.get('/', productsController.getProducts);

module.exports = router;
