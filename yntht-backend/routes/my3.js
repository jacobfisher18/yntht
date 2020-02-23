const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const { checkDBIsConnected } = require('../utilities/dbConnection');

// get my3 for a given user ID
router.get('/api/my3/:userID', checkDBIsConnected, (req, res) => {

  const userID = req.params.userID;

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
})

// update a song in my3 for a user
router.put('/api/my3/:userID', checkDBIsConnected, (req, res) => {

  const userID = req.params.userID;

  const { title, artist, img, item_index } = req.body;

  const query = `
    UPDATE my3
    SET title=${mysql.escape(title)}, artist=${mysql.escape(artist)}, img=${mysql.escape(img)}
    WHERE user_id='${userID}' AND item_index=${item_index};
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send({ error: 'Database error.' });
      return;
    }
    
    // Success
    res.status(200).send({ message: 'Success' });
  });
})

// reset my3 to blank for a user
// TODO
// 1. the format of this is outdated after the refactor
// 2. this should be put into a function and called only on the user deletion route
// router.put('/api/my3/:userID/reset', checkDBIsConnected, (req, res) => {

//   const userID = req.params.userID;

//   const query = `
//     UPDATE my3
//     SET title=NULL, artist=NULL, img=NULL
//     WHERE user_id='${userID}';
//   `

//   connection.query(query, (error, results) => {
//     if (error) {
//       console.log(error.sqlMessage || error.code);
//       res.status(500).send('MYSQL error');
//     } else {
//       console.log('Results: ', results);
//       res.status(200).send('My3 reset');
//     }
//   });
// })

module.exports = router;
