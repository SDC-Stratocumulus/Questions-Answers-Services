const db = require('../db/index');
const config = require('../../config/config');

const getAnswers = async function (questionID, cb) {
  console.log(questionID);
  const connection = new db(config);
  let resultObject = {
    question: questionID,
    page: 0,
    count: 5,
    results: [],
  };

  try {
    const getAnswer = await connection.query(
      `SELECT * FROM answers WHERE question_id = ?`,
      questionID
    );
    // Iterate answers
    for (let i = 0; i < getAnswer.length; i++) {
      let temp = {
        answer_id: getAnswer[i].id,
        body: getAnswer[i].body,
        date: getAnswer[i].date_written,
        answerer_name: getAnswer[i].answerer_name,
        helpfulness: getAnswer[i].helpful,
        photos: [],
      };
      const getPhotos = await connection.query(
        `SELECT id, url FROM answers_photos WHERE answer_id = ? `,
        getAnswer[i].id
      );
      for (let j = 0; j < getPhotos.length; j++) {
        let image = {
          id: getPhotos[j].id,
          url: getPhotos[j].url,
        };
        temp.photos.push(image);
      }
      resultObject.results.push(temp);
    }
    connection.close();
    cb(null, resultObject);
  } catch (error) {
    cb(error, null);
  }
};

module.exports.getAnswers = getAnswers;
