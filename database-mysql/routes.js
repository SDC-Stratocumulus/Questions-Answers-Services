var controller = require('./controllers/index');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/questions', controller.questions.get);
router.get('/questions/:id/answers', controller.answers.get);
router.post('/questions', controller.postQuestion.post);
router.post('/questions/:id/answers', controller.postAnswer.post);
// Routes for marking questions
router.put('/questions/:id/helpful', controller.putHelpful.update);
router.put('/questions/:id/report', controller.reportQuestion.update);
// Routes for answers
router.put('/answers/:id/helpful', controller.answerHelpful.update);
router.put('/answers/:id/report', controller.answerReport.update);

module.exports = router;
