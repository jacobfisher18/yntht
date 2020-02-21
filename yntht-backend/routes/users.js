const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const crypto = require('crypto');
const { initMy3 } = require('../utilities/my3');
const { checkDBIsConnected } = require('../utilities/dbConnection');

// get all users
router.get('/api/users', checkDBIsConnected, (req, res) => {

  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send('MYSQL error');
    } else {
      console.log('Users: ', results);
      res.status(200).send(results);
    }
  });
})

// add a new user
router.post('/api/user', checkDBIsConnected, (req, res) => {

  const { username, password } = req.body;

  // TODO: validate username and password
  //    validate username and password (correct length, format, etc.)
  //    make sure the username doesn't exist yet and handle that error on frontend

  if (!username || !password) {
    console.log('Username or password not provided');
    res.status(400).send('Username or password not provided');
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
    VALUES (${mysql.escape(username)}, '${hashedPassword}')
    `

  // Insert the user into the DB
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send('MYSQL error');
    } else {
      // Get the ID we just generated
      connection.query('SELECT @@IDENTITY', (error, results, fields) => {
        if (error) {
          console.log(error.sqlMessage || error.code);
          res.status(500).send('MYSQL error');
        } else {
          const userID = results[0]['@@IDENTITY'];

          // Create my3 slots in the db for the user
          initMy3(userID).then(() => {
            res.status(200).send({
              status: "Created",
              user_id: userID,
              username
            })
          }).catch(err => {
            console.log(err);
            res.status(500).send('Error initializing My3');
          })
        }
      });
    }
  });
})

// authenticate a user
router.post('/api/user/auth', checkDBIsConnected, (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    console.log('Please supply a username and a password')
    res.status(400).send('Username or password was not provided');
    return;
  }

  // encrypt password
  const secret = 'abc123'
  var mykey = crypto.createCipher('aes-128-cbc', secret);
  var mystr = mykey.update(password, 'utf8', 'hex')
  mystr += mykey.final('hex');

  const hashedPassword = mystr;

  const query = `SELECT * FROM users WHERE username=${mysql.escape(username)}`;

  connection.query(query, (error, results, fields) => {

    if (error) {
      console.log(error);
      res.status(500).send("Error");
    }

    if (results.length < 1) {
      // there's no user with that username
      res.status(401).send("Username Not Found");
    } else if (results.length > 1) {
      // there are multiple users with that username in the db, this is an issue
      console.log(`Error: Multiple users with username ${username}`);
      res.status(500).send("Error");
    } else {
      const foundUser = results[0];

      // check if password was right
      if (foundUser.password !== hashedPassword) {
        res.status(403).send("Incorrect Password");
      } else {
        // user and password were found
        res.status(200).send({
          status: "Found",
          user_id: foundUser.id,
          username: foundUser.username
        })
      }
    }
  });

})

// delete a user
router.delete('/api/user/:userID', checkDBIsConnected, (req, res) => {

  const userID = req.params.userID;

  const query = `DELETE FROM users WHERE id = "${userID}"`

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send('MYSQL error');
    } else {
      console.log("Number of records deleted: " + results.affectedRows);
      res.status(200).send('Records succesfully deleted');
    }
  });

})

module.exports = router;
