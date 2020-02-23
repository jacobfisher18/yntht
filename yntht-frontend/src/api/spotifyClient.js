export const spotifySearchRequest = (searchTerm) => new Promise((resolve, reject) => {
  fetch(`/spotify/search?q=${encodeURIComponent(searchTerm)}`)
    .then(response => response.json())
    .then(myJson => {
      resolve(myJson);
    })
    .catch(err => {
      console.log('Error with fetch request: ', err);
      reject();
    });
});
