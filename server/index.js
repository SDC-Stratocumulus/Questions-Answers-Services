const express = require('express');
const port = process.env.PORT || 3000;
const router = require('../database-mysql/routes.js');
const app = express();

// Set up our routes
app.use('/qa', router);

app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});
