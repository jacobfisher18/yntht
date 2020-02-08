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

// TO-DO: look into field lengths for VARCHAR (is 150 enough? too much?)
// TO-DO: (Related) Data insertion breaks if we try to insert something too bad, so check for that

module.exports = { connectToDB }