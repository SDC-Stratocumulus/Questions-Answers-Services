const db = require('../db/index.js');
const config = require('../../ config/config');

module.exports = {
  get: function (productID, callback) {
    const connection = new db(config);

    let returnOb = {
      product_id: '',
      results: [],
    };
    //let resultArr = [];
    connection
      .query(
        `SELECT p.id as "product_id", q.id as "question_id", q.body as "question_body", q.date_written as "question_date",
    q.asker_name as "asker_name", q.helpful as "question_helpfulness", q.reported as "reported",
    a.id as "id", a.body as "body", a.date_written as "date", a.answerer_name as "answerer_name",
    a.helpful as "helpfulness", ap.url as "url"
    FROM products p
    LEFT JOIN questions q
    ON q.product_id = p.id
    LEFT JOIN answers a
    ON a.question_id = q.id
    LEFT JOIN answers_photos ap
    ON ap.answer_id = a.id
    WHERE p.id = ?;`,
        productID
      )
      .then((result) => {
        // Create the format
        for (let i = 0; i < result.length; i++) {
          //console.log(result[i]);
          returnOb.product_id = result[i].product_id + '';
          let questionObject = {};
          questionObject['question_id'] = result[i].question_id;
          questionObject['question_body'] = result[i].question_body;
          questionObject['question_date'] = result[i].question_date;
          questionObject['asker_name'] = result[i].asker_name;
          questionObject['question_helpfulness'] =
            result[i].question_helpfulness;
          questionObject['reported'] = result[i].reported;
          questionObject['answers'] = {};
          questionObject.answers[result[i].id] = {};
          questionObject.answers[result[i].id]['id'] = result[i].id;
          questionObject.answers[result[i].id]['body'] = result[i].body;
          questionObject.answers[result[i].id]['date'] = result[i].date;
          questionObject.answers[result[i].id]['answerer_name'] =
            result[i].answerer_name;
          questionObject.answers[result[i].id]['helpfulness'] =
            result[i].helpfulness;
          if (result[i].url === null) {
            questionObject.answers[result[i].id]['url'] = [];
          } else {
            questionObject.answers[result[i].id]['url'] = [];
            questionObject.answers[result[i].id]['url'].push(result[i].url);
          }

          //returnOb.results.push(result[i]);
          returnOb.results.push(questionObject);
        }
        // Remove the duplicate

        callback(null, returnOb);
      })
      .catch((error) => {
        callback(error, null);
      });
  },
};
