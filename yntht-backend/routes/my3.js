const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const { checkDBIsConnected } = require('../utilities/dbConnection');

// get my3 for a given user ID
router.get('/api/my3/:userID', checkDBIsConnected, (req, res) => {
  const { userID } = req.params;

  const query = `
    SELECT * FROM my3 WHERE user_id='${userID}'
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

// update a song in my3 for a user
router.put('/api/my3/:userID', checkDBIsConnected, (req, res) => {
  const { userID } = req.params;

  const {
    username, title, artist, img, item_index: itemIndex,
  } = req.body;

  // we need to send username in request body now

  const query = `
    UPDATE my3
    SET title=${mysql.escape(title)}, artist=${mysql.escape(artist)}, img=${mysql.escape(img)}
    WHERE user_id='${userID}' AND item_index=${itemIndex};
    INSERT INTO actions (user_id, username, title, artist, img)
    VALUES (${mysql.escape(userID)}, ${mysql.escape(username)}, ${mysql.escape(title)}, ${mysql.escape(artist)}, ${mysql.escape(img)});
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
