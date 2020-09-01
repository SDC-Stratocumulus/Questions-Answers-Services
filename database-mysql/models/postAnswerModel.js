const db = require('../db/index');
const config = require('../../config/config');

const postAnswer = async function (questionID, body, cb) {
  const connection = new db(config);
  console.log(questionID, ' ', body);
  const date = new Date();
  //TODO: NEED to account if question exist

  try {
    const questionExist = await connection.query(
      `SELECT id FROM questions WHERE id = ?`,
      questionID
    );
    console.log(questionExist.length);
    if (questionExist.length === 0) {
      cb(500, null);
    } else {
      const insertAnswerId = await connection.query(
        `INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES (?,?,?,?,?,?,?)`,
        [questionID, body.body, date, body.name, body.email, 0, 0]
      );
      //console.log(insertAnswerId);
      const insertPhoto = await connection.query(
        `INSERT INTO answers_photo (answer_id, url) VALUES (?,?)`,
        [insertAnswerId.insertId, body.photos]
      );
      if (insertPhoto.affectedRows !== undefined) {
        cb(null, insertPhoto);
      }
    }
  } catch (error) {
    cb(error, null);
  }
};

module.exports.postAnswer = postAnswer;
