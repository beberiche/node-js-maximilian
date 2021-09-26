const path = require('path');
const express = require('express');
const router = express.Router();

const pathHelper = require('../utils/pathHelper');

router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(pathHelper, 'views', 'add-product.html'));
});

router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
