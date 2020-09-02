const models = require('../models/index');

module.exports = {
  get: function (req, res) {
    //console.log(req.query.product_id);
    if (req.query.product_id === undefined) {
      res.sendStatus(404);
    } else {
      models.questions.getProduct(req.query.product_id, (error, data) => {
        if (error) {
          console.log(error);
          res.sendStatus(500);
        } else {
          res.send(data);
        }
      });
    }
  },
};
