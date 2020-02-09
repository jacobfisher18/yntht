const fetch = require('node-fetch')

// Spotify Constant Variables
const clientID = "58fc678791344bcd9f97736b29a9de00";
const clientSecret = "40a3e7ffb8a84bb18807331c494620a2";
const encodedKeyAndSecret = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');
const spotifyAuthUrl = "https://accounts.spotify.com/api/token";

// TODO: spotifyToken needs to be private, we only access it through the function getSpotifyToken
let spotifyToken = "";
let spotifyTokenExpired = false;
let tokenExpirationTimeout;

// Get Spotify API token preferably from local cache, or otherwise from Spotify API
const getSpotifyToken = () => new Promise((resolve, reject) => {

  // if we have a token in local cache and it's not expired
  if (spotifyToken && !spotifyTokenExpired) {
    console.log(`Token retrieved from local cache: ${spotifyToken}`);
    resolve(spotifyToken);
  } else {
    console.log(`Fetching token from url: ${spotifyAuthUrl}`);
    fetch(spotifyAuthUrl, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedKeyAndSecret}`,
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    })
      .then(response => response.json())
      .then(myJson => {
        if ("error" in myJson) {
          reject(`Spotify returned an error: ${myJson.error_description}`);
        } else {

          // cache the retrieved token
          console.log(`Token retrieved from Spotify API: ${myJson.access_token}`);
          spotifyToken = myJson.access_token;
          spotifyTokenExpired = false;

          // clean the timeout in case there's already one running
          if (tokenExpirationTimeout) {
            clearTimeout(tokenExpirationTimeout);
          }

          // set token expiration
          tokenExpirationTimeout = setTimeout(() => {
            console.log('Spotify token has expired')
            spotifyTokenExpired = true;
          }, myJson.expires_in * 1000);

          resolve(spotifyToken);
        }
      })
      .catch(err => {
        reject(`Spotify auth request error: ${err}`);
      });
  }
})

module.exports = { getSpotifyToken }