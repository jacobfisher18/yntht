const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const crypto = require('crypto');
const { initMy3 } = require('../utilities/my3');

// get all users
router.get('/users', (req, res) => {

  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.log(error.sqlMessage || err.code);
      res.sendStatus(500);
    } else {
      console.log('Users: ', results);
      res.send(results);
    }
  });
})

// add a new user
router.post('/user', (req, res) => {

  const { username, password } = req.body;

  // TODO: validate username and password
  //    validate username and password (correct length, format, etc.)
  //    make sure the username doesn't exist yet

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

  const query = `
    INSERT INTO
    users (username, password)
    VALUES ("${mysql.escape(username)}", "${hashedPassword}")
    `

  // Insert the user into the DB
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error.sqlMessage || err.code);
      res.sendStatus(500);
    } else {
      // Get the ID we just generated
      connection.query('SELECT @@IDENTITY', (error, results, fields) => {
        if (error) {
          console.log(error.sqlMessage || err.code);
          res.sendStatus(500);
        } else {
          const userID = results[0]['@@IDENTITY'];

          // Create my3 slots in the db for the user
          initMy3(userID).then(() => {
            res.send({
              status: "Created",
              user_id: userID,
              username
            })
          }).catch(err => {
            console.log(err);
            res.sendStatus(500);
          })
        }
      });
    }
  });
})

// authenticate a user
router.post('/user/auth', (req, res) => {

  const { username, password } = req.body;

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

  const query = `SELECT * FROM users WHERE username="${mysql.escape(username)}"`;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;

    if (results.length < 1) {
      // there's no user with that username
      res.send({ status: "Not Found" });
    } else if (results.length > 1) {
      // there are multiple users with that username in the db, this is an issue
      res.send({ status: "Error" });
    } else {
      const foundUser = results[0];

      // check if password was right
      if (foundUser.password !== hashedPassword) {
        res.send({ status: "Incorrect Password" });
      } else {
        // user and password were found
        res.send({
          status: "Found",
          user_id: foundUser.id,
          username: foundUser.username
        })
      }
    }
  });

})

// delete a user
router.delete('/user/:userID', (req, res) => {

  const userID = req.params.userID;

  const query = `DELETE FROM users WHERE id = "${userID}"`

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error.sqlMessage || err.code);
      res.sendStatus(500);
    } else {
      console.log("Number of records deleted: " + results.affectedRows);
      res.sendStatus(200);
    }
  });

})

module.exports = router;
