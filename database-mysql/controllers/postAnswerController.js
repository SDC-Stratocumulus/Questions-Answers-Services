const models = require('../models/index');

module.exports = {
  post: function (req, res) {
    if (req.params.id === undefined) {
      res.sendStatus(404);
    } else {
      models.postAnswerModel.postAnswer(
        req.params.id,
        req.body,
        (error, data) => {
          if (error) {
            res.sendStatus(500);
          } else {
            res.send(201);
          }
        }
      );
    }
  },
};
