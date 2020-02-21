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

const checkDBIsConnected = (req, res, next) => {
  if (connection.state === "disconnected") {
    console.log('Request attempted while db was disconnected');
    res.status(500).send("Error");
  } else {
    // db is connected, we can proceed
    next();
  }
}

module.exports = { connectToDB, checkDBIsConnected }