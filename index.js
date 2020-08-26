const express = require('express');
const getQA = require('./routes/getQA.js');
const app = express();

// Middleware

// Define Routes
app.use('/questions', getQA);

app.get('/', (req, res) => {
  res.send('Index');
});

// connect to mongo

app.listen(3000);
