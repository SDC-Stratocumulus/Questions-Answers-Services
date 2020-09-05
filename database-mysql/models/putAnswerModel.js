const db = require('../db/index');
const config = require('../../config/config');

const updateHelpfulAnswer = async (answerID, callback) => {
  const connection = new db(config);

  try {
    const findQuestion = await connection.query(
      `SELECT id, helpful FROM answers WHERE id = ?`,
      answerID
    );

    connection
      .query(`UPDATE answers SET helpful = ? WHERE id = ?`, [
        findQuestion[0].helpful + 1,
        findQuestion[0].id,
      ])
      .then((result) => {
        callback(null, result);
      })
      .catch((error) => {
        callback(error, null);
      });
  } catch (error) {
    callback(error, null);
  } finally {
    connection.close();
  }
};

module.exports.updateHelpfulAnswer = updateHelpfulAnswer;
