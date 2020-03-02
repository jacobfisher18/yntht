const express = require('express');

const router = express.Router();
const { checkDBIsConnected } = require('../utilities/dbConnection');

// get every account that a user is following
router.get('/api/followers/:userID', checkDBIsConnected, (req, res) => {
  const { userID } = req.params;

  const followersQuery = `
    SELECT * FROM followers WHERE following_id='${userID}';
  `;

  connection.query(followersQuery, (error, followersResults) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send({ error: 'Database error.' });
      return;
    }

    if (followersResults.length < 1) {
      res.status(200).send({ data: [] });
      return;
    }

    const ids = followersResults.map((item) => item.follower_id);

    const usernamesQuery = `
    SELECT id, username FROM users WHERE id in (${ids.join(', ')});
    `;

    connection.query(usernamesQuery, (error, usernamesResults) => {
      if (error) {
        console.log(error.sqlMessage || error.code);
        res.status(500).send({ error: 'Database error.' });
        return;
      }

      res.status(200).send({ data: usernamesResults });
    });
  });
});

// get every account that follows a user
router.get('/api/following/:userID', checkDBIsConnected, (req, res) => {
  const { userID } = req.params;

  const followingQuery = `
    SELECT * FROM followers WHERE follower_id='${userID}';
  `;

  connection.query(followingQuery, (error, followingResults) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send({ error: 'Database error.' });
      return;
    }

    if (followingResults.length < 1) {
      res.status(200).send({ data: [] });
      return;
    }

    const ids = followingResults.map((item) => item.following_id);

    const usernamesQuery = `
    SELECT id, username FROM users WHERE id in (${ids.join(', ')});
    `;

    connection.query(usernamesQuery, (error, usernamesResults) => {
      if (error) {
        console.log(error.sqlMessage || error.code);
        res.status(500).send({ error: 'Database error.' });
        return;
      }

      res.status(200).send({ data: usernamesResults });
    });
  });
});

// add a new follower to the db
router.post('/api/follower', checkDBIsConnected, (req, res) => {
  const { follower_id, following_id } = req.body;

  if (!follower_id || !following_id) {
    console.log('Follower or following not provided.');
    res.status(400).send({ error: 'Follower or following not provided.' });
    return;
  }

  const query = `
        INSERT INTO followers (follower_id, following_id ) VALUES
        (${follower_id}, ${following_id});
      `;

  connection.query(query, (error) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send({ error: 'Database error.' });
      return;
    }

    // Success
    res.status(200).send({ message: 'Success' });
  });
});

// remove a follower from the db
router.delete('/api/follower', checkDBIsConnected, (req, res) => {
  const { follower_id, following_id } = req.body;

  if (!follower_id || !following_id) {
    console.log('Follower or following not provided.');
    res.status(400).send({ error: 'Follower or following not provided.' });
    return;
  }

  const query = `
        DELETE FROM followers WHERE
        follower_id = ${follower_id} AND
        following_id = ${following_id};
      `;

  connection.query(query, (error) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send({ error: 'Database error.' });
      return;
    }

    // Success
    res.status(200).send({ message: 'Success' });
  });
});

module.exports = router;
