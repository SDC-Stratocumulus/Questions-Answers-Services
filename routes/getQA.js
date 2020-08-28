const express = require('express');
const mysql = require('../database-mysql/index');
const router = express.Router();

router.get('/', (req, res) => {
  // mysql.test();
  res.send('Testing container question');
});

module.exports = router;
