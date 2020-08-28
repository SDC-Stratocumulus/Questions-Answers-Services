var mysql = require('mysql');
var mysqlConfig = require('./config.js');

var connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'SDC',
  port: 3306,
});
connection.connect((error) => {
  if (error) {
    console.log(error);
    console.log('Unable to connect to DB');
  } else {
    console.log('Connection to DB: ');
  }
});

function test() {
  connection.query('SELECT * FROM products', function (err, results, fields) {
    if (err) throw error;
    else {
      console.log(results);
    }
  });
}

module.exports.test = test;
