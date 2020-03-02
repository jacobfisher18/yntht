export const getFollowers = (userID) => new Promise((resolve, reject) => {
  fetch(`/api/followers/${userID}`)
    .then((response) => response.json()) // response must be in json or this will error
    .then((myJson) => {
      resolve(myJson);
    })
    .catch((err) => {
      console.log('Error with fetch request: ', err);
      reject();
    });
});

export const getFollowing = (userID) => new Promise((resolve, reject) => {
  fetch(`/api/following/${userID}`)
    .then((response) => response.json()) // response must be in json or this will error
    .then((myJson) => {
      resolve(myJson);
    })
    .catch((err) => {
      console.log('Error with fetch request: ', err);
      reject();
    });
});

export const addFollower = (followerID, followingID) => new Promise((resolve, reject) => {
  fetch('/api/follower', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      follower_id: followerID,
      following_id: followingID,
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
