const express = require('express');
const port = process.env.PORT || 3000;
const router = require('../database-mysql/routes.js');
const path = require('path');
const bodyParser = require('body-parser');
const caching = require('../middleware/index');

const app = express();
app.use(bodyParser.json());

// Loader IO stress tester
app.use(express.static(path.join(__dirname, '../loader/')));

// Use middleware for redis
app.use(caching());

// Set up our routes
app.use('/qa', router);

app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});
