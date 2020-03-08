const express = require('express');

const router = express.Router();
const { checkDBIsConnected } = require('../utilities/dbConnection');

// get history for a given user, which is all their actions
router.get('/api/history/:userID', checkDBIsConnected, (req, res) => {
  const { userID } = req.params;

  const query = `
    SELECT * FROM actions WHERE user_id='${userID}';
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
    ORDER BY timestamp ASC;
    `;

    connection.query(feedQuery, (error, feedResults) => {
      if (error) {
        console.log(error.sqlMessage || error.code);
        res.status(500).send({ error: 'Database error.' });
        return;
      }

      console.log(feedResults);

      res.status(200).send({ data: feedResults });
    });
  });
});

module.exports = router;
