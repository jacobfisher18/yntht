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
        reject(response);
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
});

export const createUser = (username, password) => new Promise((resolve, reject) => {
  fetch(`/api/user`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(response => response.json()) // response must be in json or this will error
    .then(myJson => {
      resolve(myJson);
    })
    .catch(err => {
      console.log('Error with fetch request: ', err);
      reject();
    });
});
