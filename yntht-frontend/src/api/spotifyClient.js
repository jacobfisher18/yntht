export const spotifySearchRequest = (searchTerm) => new Promise((resolve, reject) => {
  fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
    .then(response => response.json())
    .then((myJson) => {
      resolve(myJson);
    })
    .catch(err => {
      reject(err);
    });
})
