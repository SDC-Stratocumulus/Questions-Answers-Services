const db = require('../db/index');
const config = require('../../config/config');

const reportQuestion = async (questionID, callback) => {
  const connection = new db(config);

  try {
    const findQuestion = await connection.query(
      `SELECT id, reported FROM questions WHERE id = ?`,
      questionID
    );

    connection
      .query(`UPDATE questions SET reported = ? WHERE id = ?`, [
        findQuestion[0].reported + 1,
        findQuestion[0].id,
      ])
      .then((result) => {
        callback(null, result);
      })
      .catch((error) => {
        callback(error, null);
      });

    connection.close();
  } catch (error) {
    callback(error, null);
  }
};

module.exports.reportQuestion = reportQuestion;
