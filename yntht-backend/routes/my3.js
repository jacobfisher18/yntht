const express = require('express')
const router = express.Router()

// set 3 blank my3s (with index 0, 1, 2) for a given user ID
router.post('/my3/init/:userID', (req, res) => {

  const userID = req.params.userID;

  // if there is already some data in the db, we should probably deal with that case
  // the user shouldn't be in the database at all yet

  const query = `
    INSERT INTO my3 (user_id, item_index ) VALUES
    ("${userID}", ${0}),
    ("${userID}", ${1}),
    ("${userID}", ${2})
    `

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log('Results: ', results);
    res.sendStatus(200);
  });

})

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

// update a songin my3 for a user
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
