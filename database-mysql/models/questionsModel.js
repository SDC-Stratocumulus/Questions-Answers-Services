const db = require('../db/index.js');
const config = require('../../config/config.js');

const getProduct = async (productID, callback) => {
  //console.log(productID);
  const connection = new db(config);
  let resultObject = {
    product_id: '',
    results: [],
  };

  try {
    const prod_ID = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      productID
    );
    //console.log(prod_ID[0].id);
    resultObject['product_id'] = prod_ID[0].id + '';
    // Get Questions
    const question = await connection.query(
      `SELECT id as 'question_id', body as "question_body", date_written as "question_date",
      asker_name, helpful as "question_helpfulness", reported
      FROM questions WHERE product_id = ? `,
      prod_ID[0].id
    );
    // Get answer
    //console.log(question);
    for (let i = 0; i < question.length; i++) {
      //console.log(question[i]);
      let temp = question[i];
      temp['answers'] = {};
      resultObject.results.push(temp);
    }
    //console.log(resultObject.results);

    // Get answers for each unique questions
    let answers;
    for (let i = 0; i < resultObject.results.length; i++) {
      answers = await connection.query(
        `SELECT  id, question_id, body, date_written as "date", answerer_name, helpful as "helpfulness"
      FROM answers
      WHERE question_id = ? `,
        resultObject.results[i].question_id
      );
      //.log(answers[0]);
      for (let j = 0; j < answers.length; j++) {
        //console.log(answers[j]);
        if (answers[j].question_id === resultObject.results[i].question_id) {
          resultObject.results[i].answers[answers[j].id] = {
            id: answers[j].id,
            body: answers[j].body,
            date: answers[j].date,
            answerer_name: answers[j].answerer_name,
            helpfulness: answers[j].helpfulness,
            photos: [],
          };

          const getPhotos = await connection.query(
            `SELECT id, url FROM answers_photos WHERE answer_id = ? `,
            answers[j].id
          );
          for (let x = 0; x < getPhotos.length; x++) {
            resultObject.results[i].answers[answers[j].id].photos.push(
              getPhotos[x].url
            );
          }
        }
      }
    }

    // Build pictures URL object
    console.log(resultObject);
    callback(null, resultObject);
  } catch (error) {
    //console.log(error);
    callback(error, null);
  }
  //console.log(response);
};

module.exports.getProduct = getProduct;