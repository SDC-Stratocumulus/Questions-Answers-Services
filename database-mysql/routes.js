var controller = require('./controllers/index');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/questions', controller.questions.get);
router.get('/questions/:id/answers', controller.answers.get);
router.post('/questions', controller.postQuestion.post);
router.post('/questions/:id/answers', controller.postAnswer.post);

module.exports = router;
