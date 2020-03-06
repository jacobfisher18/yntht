const express = require('express');
const mysql = require('mysql');

const router = express.Router();
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

// get a user given their ID
router.get('/api/user/:userID', checkDBIsConnected, (req, res) => {
  const { userID } = req.params;

  const query = `
    SELECT username FROM users WHERE id = "${userID}"
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send({ error: 'Database error.' });
      return;
    }

    if (results.length < 1) {
      console.log('No user found for that ID');
      res.status(404).send({ error: 'No user found for that ID.' });
      return;
    }

    res.status(200).send({ data: { username: results[0].username } });
  });
});

module.exports = router;


// search through users for a given term
router.get('/api/users/:searchTerm', checkDBIsConnected, (req, res) => {
  const { searchTerm } = req.params;

  const query = `
    SELECT id, username FROM users where SOUNDEX(username) = SOUNDEX('${searchTerm}') LIMIT 15
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
    connection.query(insertUserQuery, (error) => {
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
            username,
          });
        }).catch((err) => {
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
    res.status(400).send({ error: 'Username or password not provided.' });
    return;
  }

  const query = `
    SELECT * FROM users WHERE username=${mysql.escape(username)}
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send({ error: 'Database error.' });
      return;
    }

    if (results.length < 1) {
      console.log('Username not found.');
      res.status(401).send({ error: 'Username not found.' });
      return;
    }

    if (results.length > 1) {
      console.log('Multiple users with that username exist.');
      res.status(401).send({ error: 'Multiple users with that username exist. This is an error and should be reported.' });
      return;
    }

    const foundUser = results[0];

    // check if password was right
    if (foundUser.password !== encryptPassword(password)) {
      console.log('Incorrect Password.');
      res.status(403).send({ error: 'Incorrect password.' });
      return;
    }

    // user and password were found
    res.status(200).send({
      user_id: foundUser.id,
      username: foundUser.username,
    });
  });
});

// delete a user
router.delete('/api/user/:userID', checkDBIsConnected, (req, res) => {
  const { userID } = req.params;

  const query = `
    DELETE FROM users WHERE id = "${userID}";
    DELETE FROM my3 WHERE user_id = "${userID}";
    DELETE FROM followers WHERE follower_id = "${userID}" OR following_id = "${userID}";
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send({ error: 'Database error while deleting user.' });
      return;
    }

    if (results[0].affectedRows !== 1) {
      res.status(500).send({ error: 'No user was deleted.' });
    }

    if (results[1].affectedRows !== 3) {
      console.log("Something weird happened with deleting the user's my3.");
    }

    res.status(200).send({ message: 'User succesfully deleted.' });
  });
});

module.exports = router;
