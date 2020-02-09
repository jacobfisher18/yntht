export const authUser = (username, password) => new Promise((resolve, reject) => {
  fetch(`/user/auth`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(myJson => {
      console.log(myJson)
      resolve(myJson)
    })
    .catch(err => {
      console.log(`Error with authUser request: ${err}`);
      reject("Error with authUser request");
    });
})
