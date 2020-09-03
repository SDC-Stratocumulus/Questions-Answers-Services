const models = require('../models/index');

module.exports = {
  update: function (req, res) {
    if (req.params.id === undefined) {
      res.sendStatus(404);
    } else {
      models.updateHelpfulModel.updateHelpful(req.params.id, (error, data) => {
        if (error) {
          res.send(500);
        } else {
          res.sendStatus(204);
        }
      });
    }
  },
};
