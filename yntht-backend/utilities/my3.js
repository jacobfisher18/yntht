// Create 3 rows in the my3 table for the user
const initMy3 = (userID) => new Promise((resolve, reject) => {
  // To-Do: if there is already some data in the db for the userID, we should probably deal with that case
  // the user shouldn't be in the database at all yet

  const query = `
    INSERT INTO my3 (user_id, item_index ) VALUES
    ("${userID}", ${0}),
    ("${userID}", ${1}),
    ("${userID}", ${2})
    `

  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    // To-Do: check if results looks about right (i.e. 3 items)
    if (results) {
      resolve();
    } else {
      reject();
    }
  });
})

module.exports = { initMy3 }

// To-Do: delete these 3 cells when a user is deleted