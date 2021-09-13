const path = require('path');

const express = require('express');
const router = express.Router();

const pathHelper = require('../utils/pathHelper');

router.get('/', (req, res, next) => {
  // console.log('in another middle-ware');
  res.sendFile(path.join(pathHelper, 'views', 'shop.html'));
});

module.exports = router;
