// TODO: for all backend routes, standardize what we return for success or error
// We should always send a response code and a json object with some data
// On the front end, all requests should then look the same and handle errors the same
const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const { checkDBIsConnected } = require('../utilities/dbConnection');

// get my3 for a given user ID
router.get('/api/my3/:userID', checkDBIsConnected, (req, res) => {

  const userID = req.params.userID;

  connection.query(`SELECT * FROM my3 WHERE user_id='${userID}'`, (error, results, fields) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send('MYSQL error');
    } else {
      console.log('Users: ', results);
      res.status(200).send(results);
    }
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
  `

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send('MYSQL error');
    } else {
      console.log('Results: ', results);
      res.status(200).send('My3 updated');
    }
  });
})

// reset my3 to blank for a user
router.put('/api/my3/:userID/reset', checkDBIsConnected, (req, res) => {

  const userID = req.params.userID;

  const query = `
    UPDATE my3
    SET title=NULL, artist=NULL, img=NULL
    WHERE user_id='${userID}';
  `

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error.sqlMessage || error.code);
      res.status(500).send('MYSQL error');
    } else {
      console.log('Results: ', results);
      res.status(200).send('My3 reset');
    }
  });

})

module.exports = router;
