const express = require('express');
const getQA = require('./routes/getQA.js');
const port = process.env.PORT || 3000;
const app = express();

// Middleware

// Define Routes
app.use('/questions', getQA);

app.get('/', (req, res) => {
  res.send('Indexs');
});

// connect to mongo

app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});
