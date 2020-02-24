export const authUser = (username, password) => new Promise((resolve, reject) => {
  fetch('/api/user/auth', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => response.json()) // response must be in json or this will error
    .then((myJson) => {
      resolve(myJson);
    })
    .catch((err) => {
      console.log('Error with fetch request: ', err);
      reject();
    });
});

export const createUser = (username, password) => new Promise((resolve, reject) => {
  fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((response) => response.json()) // response must be in json or this will error
    .then((myJson) => {
      resolve(myJson);
    })
    .catch((err) => {
      console.log('Error with fetch request: ', err);
      reject();
    });
});

export const deleteUser = (userID) => new Promise((resolve, reject) => {
  fetch(`/api/user/${userID}`, {
    method: 'DELETE',
  })
    .then((response) => response.json()) // response must be in json or this will error
    .then((myJson) => {
      resolve(myJson);
    })
    .catch((err) => {
      console.log('Error with fetch request: ', err);
      reject();
    });
});

export const searchUsers = (searchTerm) => new Promise((resolve, reject) => {
  fetch(`/api/users/${searchTerm}`)
    .then((response) => response.json()) // response must be in json or this will error
    .then((myJson) => {
      resolve(myJson);
    })
    .catch((err) => {
      console.log('Error with fetch request: ', err);
      reject();
    });
});
