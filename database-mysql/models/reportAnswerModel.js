const db = require('../db/index');
const config = require('../../config/config');

const reportAnswer = async (answerID, callback) => {
  const connection = new db(config);

  try {
    const findQuestion = await connection.query(
      `SELECT id, reported FROM answers WHERE id = ?`,
      answerID
    );

    connection
      .query(`UPDATE answers SET reported = ? WHERE id = ?`, [
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
  } finally {
    connection.close();
  }
};

module.exports.reportAnswer = reportAnswer;
