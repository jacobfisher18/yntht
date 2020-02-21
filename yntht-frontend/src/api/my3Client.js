export const getMy3ForUser = (userID) => new Promise((resolve, reject) => {
  fetch(`/api/my3/${userID}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(myJson => {
      resolve(myJson);
    })
    .catch(err => {
      reject(err);
    });
})

export const putMy3ForUser = (userID, title, artist, img, item_index) => new Promise((resolve, reject) => {
  fetch(`/api/my3/${userID}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      userID,
      title,
      artist,
      img,
      item_index,
    })
  })
    .then(response => {
      if (response.ok) {
        resolve(response)
      } else {
        reject(response.statusText);
      }
    })
    .catch(err => {
      reject(err);
    });
})