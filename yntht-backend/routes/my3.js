// TODO: for all backend routes, standardize what we return for success or error
// We either return 200 response with some data, 200 without data, or an error code
// On the front end, all requests should then look the same and handle errors the same
const express = require('express')
const router = express.Router()

// get my3 for a given user ID
router.get('/my3/:userID', (req, res) => {

  const userID = req.params.userID;

  connection.query(`SELECT * FROM my3 WHERE user_id='${userID}'`, (error, results, fields) => {
    if (error) {
      console.log(error.sqlMessage || err.code);
      res.sendStatus(500);
    } else {
      console.log('Users: ', results);
      res.send(results);
    }
  });
})

// update a song in my3 for a user
router.put('/my3/:userID', (req, res) => {

  const userID = req.params.userID;

  const { title, artist, img, item_index } = req.body;

  // TODO: escape certain characters that break this (i.e. apostrophe)
  // TODO: check length of the song, artists, img, etc. and such

  const query = `
    UPDATE my3
    SET title='${title}', artist='${artist}', img='${img}'
    WHERE user_id='${userID}' AND item_index=${item_index};
  `

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error.sqlMessage || err.code);
      res.sendStatus(500);
    } else {
      console.log('Results: ', results);
      res.sendStatus(200);
    }
  });
})

// reset my3 to blank for a user
router.put('/my3/:userID/reset', (req, res) => {

  const userID = req.params.userID;

  const query = `
    UPDATE my3
    SET title=NULL, artist=NULL, img=NULL
    WHERE user_id='${userID}';
  `

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error.sqlMessage || err.code);
      res.sendStatus(500);
    } else {
      console.log('Results: ', results);
      res.sendStatus(200);
    }
  });

})

module.exports = router;
