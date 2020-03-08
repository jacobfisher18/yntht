export const getFeed = (userID) => new Promise((resolve, reject) => {
  fetch(`/api/feed/${userID}`)
    .then((response) => response.json()) // response must be in json or this will error
    .then((myJson) => {
      resolve(myJson);
    })
    .catch((err) => {
      console.log('Error with fetch request: ', err);
      reject();
    });
});

export const getHistory = (userID) => new Promise((resolve, reject) => {
  fetch(`/api/history/${userID}`)
    .then((response) => response.json()) // response must be in json or this will error
    .then((myJson) => {
      resolve(myJson);
    })
    .catch((err) => {
      console.log('Error with fetch request: ', err);
      reject();
    });
});

export const deleteAction = (actionID) => new Promise((resolve, reject) => {
  fetch(`/api/action/${actionID}`, {
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
