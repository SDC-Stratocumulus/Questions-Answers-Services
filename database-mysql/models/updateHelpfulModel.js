const db = require('../db/index');
const config = require('../../config/config');

const updateHelpful = async (questionID, callback) => {
  const connection = new db(config);

  try {
    const findQuestion = await connection.query(
      `SELECT id, helpful FROM questions WHERE id = ?`,
      questionID
    );

    connection
      .query(`UPDATE questions SET helpful = ? WHERE id = ?`, [
        findQuestion[0].helpful + 1,
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

module.exports.updateHelpful = updateHelpful;
