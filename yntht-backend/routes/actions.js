const express = require('express');

const router = express.Router();
const { checkDBIsConnected } = require('../utilities/dbConnection');

// get history for a given user, which is all their actions
router.get('/api/history/:userID', checkDBIsConnected, (req, res) => {
  const { userID } = req.params;

  const query = `
    SELECT * FROM actions
    WHERE user_id='${userID}'
    ORDER BY timestamp DESC;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send({ error: 'Database error.' });
      return;
    }

    console.log(results);

    res.status(200).send({ data: results });
  });
});

// get feed for a given user, which is all the actions of the people they follow,
//  plus all their actions, in chronological order
router.get('/api/feed/:userID', checkDBIsConnected, (req, res) => {
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

    ids.push(Number(userID));

    const feedQuery = `
      SELECT * FROM actions
      WHERE user_id in (${ids.join(', ')})
      ORDER BY timestamp DESC;
    `;

    connection.query(feedQuery, (error, feedResults) => {
      if (error) {
        console.log(error.sqlMessage || error.code);
        res.status(500).send({ error: 'Database error.' });
        return;
      }

      res.status(200).send({ data: feedResults });
    });
  });
});

// remove an action from the db
router.delete('/api/action/:actionID', checkDBIsConnected, (req, res) => {
  const { actionID } = req.params;

  if (!actionID) {
    console.log('Action ID not provided.');
    res.status(400).send({ error: 'You need to provide an action ID.' });
    return;
  }

  const query = `DELETE FROM actions WHERE id = ${actionID};`;

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
