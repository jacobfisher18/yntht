const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const { initMy3 } = require('../utilities/my3');
const { encryptPassword } = require('../utilities/encrypt');
const { checkDBIsConnected } = require('../utilities/dbConnection');

// get all users
router.get('/api/users', checkDBIsConnected, (req, res) => {

  const query = `
    SELECT * FROM users
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send({ error: 'Database error.' });
      return;
    }

    res.status(200).send({ data: results });
  });
});

// add a new user
router.post('/api/user', checkDBIsConnected, (req, res) => {

  // username and password should have been validated already on the front end
  const { username, password } = req.body;

  if (!username || !password) {
    console.log('Username or password not provided');
    res.status(400).send({ error: 'Username or password not provided.' });
    return;
  }

  const checkUsernameQuery = `
    SELECT * FROM users WHERE username=${mysql.escape(username)}
  `;

  connection.query(checkUsernameQuery, (error, results) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send({ error: 'Database error.' });
      return;
    }

    if (results.length > 0) {
      console.log('A user with that username already exists.');
      res.status(400).send({ error: 'A user with that username already exists.' });
      return;
    }

    const insertUserQuery = `
      INSERT INTO
      users (username, password)
      VALUES (${mysql.escape(username)}, '${encryptPassword(password)}')
    `;

    // Insert the user into the DB
    connection.query(insertUserQuery, (error, results) => {
      if (error) {
        console.log(error.sqlMessage || error.code);
        res.status(500).send({ error: 'Database error.' });
        return;
      }

      const getIDQuery = `
        SELECT @@IDENTITY
      `;

      // Get the ID we just generated
      connection.query(getIDQuery, (error, results) => {
        if (error) {
          console.log(error.sqlMessage || error.code);
          res.status(500).send({ error: 'Database error.' });
          return;
        }

        const userID = results[0]['@@IDENTITY'];

        // Create my3 slots in the db for the user
        initMy3(userID).then(() => {
          res.status(200).send({
            user_id: userID,
            username
          })
        }).catch(err => {
          console.log(err);
          res.status(500).send({ error: 'Error initializing My3.' });
        });
      });
    });
  });
});

// authenticate a user
router.post('/api/user/auth', checkDBIsConnected, (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    console.log('Username or password not provided');
    // res.status(400).send({ error: 'Username or password not provided.' });
    res.status(400).send("Error"); // temp
    return;
  }

  const query = `
    SELECT * FROM users WHERE username=${mysql.escape(username)}
  `;

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
      if (foundUser.password !== encryptPassword(password)) {
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
