export const authUser = (username, password) => new Promise((resolve, reject) => {
  fetch(`/api/user/auth`, {
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
