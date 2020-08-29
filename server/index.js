const express = require('express');
const port = process.env.PORT || 3000;
const router = require('../database-mysql/routes.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
// Set up our routes
app.use('/qa', router);

app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});
