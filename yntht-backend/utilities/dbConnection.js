const mysql = require('mysql');

const connectToDB = () => new Promise((resolve, reject) => {

  connection = mysql.createConnection({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
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