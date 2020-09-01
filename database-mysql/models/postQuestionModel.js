const db = require('../db/index');
const config = require('../../config/config');

const postQuestion = async function (body, cb) {
  const connection = new db(config);
  const date = new Date();
  connection
    .query(
      ` INSERT INTO questions
      (product_id, body, date_written, asker_name, asker_email, reported, helpful)
      VALUES(?,?,?,?,?,?,?)`,
      [body.product_id, body.body, date, body.name, body.email, 0, 0]
    )
    .then((result) => {
      //console.log(result);
      if (result.affectedRows !== undefined) {
        cb(null, result);
      }
    })
    .catch((error) => {
      cb(error, null);
    });
};

module.exports.postQuestion = postQuestion;
