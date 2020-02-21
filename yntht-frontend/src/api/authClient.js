export const authUser = (username, password) => new Promise((resolve, reject) => {
  fetch(`/api/user/auth`, {
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
        return response;
      } else {
        return response.json();
      }
    })
    .then(myJson => {
      resolve(myJson)
    })
    .catch(err => {
      reject(err);
    });
})

export const createUser = (username, password) => new Promise((resolve, reject) => {
  fetch(`/api/user`, {
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
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(myJson => {
      console.log("myJson", myJson);
      resolve(myJson)
    })
    .catch(err => {
      reject(err);
    });
})
