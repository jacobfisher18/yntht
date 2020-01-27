const express = require('express')
const router = express.Router()
const crypto = require('crypto');

// get all users
router.get('/users', (req, res) => {

  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) throw error;
    console.log('Users: ', results);
    res.send(results);
  });

})

// add a new user
router.post('/user', (req, res) => {

  const { username, password } = req.body;

  // To-do: validate username and password
  //    validate username and password (correct length, format, etc.)
  //    make sure the username doesn't exist yet
  //    hash password

  if (!username || !password) {
    console.log('Please supply a username and a password')
    res.sendStatus(400);
    return;
  }

  // encrypt password
  const secret = 'abc123'
  var mykey = crypto.createCipher('aes-128-cbc', secret);
  var mystr = mykey.update(password, 'utf8', 'hex')
  mystr += mykey.final('hex');

  const hashedPassword = mystr;

  // decrypt
  // var mykey = crypto.createDecipher('aes-128-cbc', secret);
  // var mystr = mykey.update(mystr, 'hex', 'utf8')
  // mystr += mykey.final('utf8');
  // console.log(mystr);

  const query = `INSERT INTO users (username, password) VALUES ("${username}", "${hashedPassword}")`

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    res.sendStatus(200);
  });

})

// delete a user
router.delete('/user/:userID', (req, res) => {

  const userID = req.params.userID;

  const query = `DELETE FROM users WHERE id = "${userID}"`

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log("Number of records deleted: " + results.affectedRows);
    res.sendStatus(200);
  });

})

module.exports = router;
