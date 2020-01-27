const mysql = require('mysql');

const connectToDB = () => new Promise((resolve, reject) => {

  connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '@GrandGoldBike8',
    database: 'yntht_db'
  });

  connection.connect((err) => {
    if (err) {
      reject(err);
    } else {
      resolve(connection.threadId);
    }
  });
})

module.exports = { connectToDB }