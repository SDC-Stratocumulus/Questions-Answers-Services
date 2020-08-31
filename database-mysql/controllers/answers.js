const models = require('../models/index');

module.exports = {
  get: function (req, res) {
    if (req.params.id === undefined) {
      res.sendStatus(404);
    } else {
      models.answers.getAnswers(req.params.id, (error, data) => {
        if (error) {
          res.sendStatus(500);
        } else {
          res.send(data);
        }
      });
    }
  },
};
