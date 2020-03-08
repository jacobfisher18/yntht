export const getMy3ForUser = (userID) => new Promise((resolve, reject) => {
  fetch(`/api/my3/${userID}`)
    .then((response) => response.json()) // response must be in json or this will error
    .then((myJson) => {
      resolve(myJson);
    })
    .catch((err) => {
      console.log('Error with fetch request: ', err);
      reject();
    });
});

export const putMy3ForUser = (userID, username, title, artist, img, itemIndex) => new Promise((resolve, reject) => {
  fetch(`/api/my3/${userID}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      username,
      title,
      artist,
      img,
      item_index: itemIndex,
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
