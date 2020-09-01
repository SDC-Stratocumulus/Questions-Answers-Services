const models = require('../models/index');

module.exports = {
  post: function (req, res) {
    console.log(req.body);
    if (req.body.product_id === undefined) {
      res.send('Please provide a product ID');
    } else {
      models.postQuestionModel.postQuestion(req.body, (error, data) => {
        if (error) {
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  },
};
