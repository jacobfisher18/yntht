// Create 3 rows in the my3 table for the user
const initMy3 = (userID) => new Promise((resolve, reject) => {
  // TODO: if there is already some data in the db for the userID, we should probably deal with that case
  // the user shouldn't be in the database at all yet

  const query = `
    INSERT INTO my3 (user_id, item_index ) VALUES
    ("${userID}", ${0}),
    ("${userID}", ${1}),
    ("${userID}", ${2})
    `

  connection.query(query, (error, results) => {
    if (error) throw error;
    if (results && results.affectedRows === 3) {
      resolve();
    } else {
      reject(`Error initializing my3 rows for userID ${userID}`);
    }
  });
})

module.exports = { initMy3 }

// TODO: delete these 3 cells when a user is deleted