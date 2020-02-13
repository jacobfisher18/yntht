// Create 3 rows in the my3 table for the user
const initMy3 = (userID) => new Promise((resolve, reject) => {
  const checkBlankQuery = `
    SELECT * FROM my3 WHERE user_id = ${userID}
    `

  connection.query(checkBlankQuery, (error, results) => {
    if (error) reject(`Error initializing my3 rows for userID ${userID}`);;
    if (results.length > 0) {
      reject(`Error initializing my3 rows for userID ${userID}, data already exists for this user`);
    } else {
      const insertQuery = `
        INSERT INTO my3 (user_id, item_index ) VALUES
        ("${userID}", ${0}),
        ("${userID}", ${1}),
        ("${userID}", ${2})
        `

      connection.query(insertQuery, (error, results) => {
        if (error) reject(`Error initializing my3 rows for userID ${userID}`);;
        if (results && results.affectedRows === 3) {
          resolve();
        } else {
          reject(`Error initializing my3 rows for userID ${userID}`);
        }
      });
    }
  });

  
})

module.exports = { initMy3 }

// TODO: add ability to delete user profile from the front end
// then delete these 3 cells when a user is deleted