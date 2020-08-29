var controller = require('./controllers/index');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/questions', controller.questions.get);

module.exports = router;