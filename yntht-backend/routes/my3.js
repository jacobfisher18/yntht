const express = require('express')
const router = express.Router()

// get my3 for a given user ID
router.get('/my3/:userID', (req, res) => {

  const userID = req.params.userID;

  connection.query(`SELECT * FROM my3 WHERE user_id='${userID}'`, (error, results, fields) => {
    if (error) throw error;
    console.log('Users: ', results);
    res.send(results);
  });

})

// update a songin my3 for a user
router.put('/my3/:userID', (req, res) => {

  const userID = req.params.userID;

  const { title, artist, img, item_index } = req.body;

  const query = `
    UPDATE my3
    SET title='${title}', artist='${artist}', img='${img}'
    WHERE user_id='${userID}' AND item_index=${item_index};
  `

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log('Results: ', results);
    res.sendStatus(200);
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
    if (error) throw error;
    console.log('Results: ', results);
    res.sendStatus(200);
  });

})

module.exports = router;
