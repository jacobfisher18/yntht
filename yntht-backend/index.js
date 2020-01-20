const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 5000

// Spotify Constant Variables
const clientID = "58fc678791344bcd9f97736b29a9de00";
const clientSecret = "40a3e7ffb8a84bb18807331c494620a2";
const encodedKeyAndSecret = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');
const spotifyAuthUrl = "https://accounts.spotify.com/api/token";
const spotifySearchUrl = "https://api.spotify.com/v1/search";
const searchTypes = "album,track,artist";
const searchResponseLimit = 15;

// TO-DO: spotifyToken needs to be private, we only access it through the function getSpotifyToken
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

app.get('/search', (req, res) => {

  getSpotifyToken().then(spotifyToken => {

    const searchTerm = req.query.q;

    if (!searchTerm) {
      res.status(400).send('You need to provide a search term as the q parameter');
    } else {
      const requestUrl = `${spotifySearchUrl}?q=${searchTerm}&type=${searchTypes}&limit=${searchResponseLimit}`

      fetch(requestUrl, {
        mode: 'no-cors',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${spotifyToken}`,
        },
      })
        .then(response => response.json())
        .then(myJson => {
          res.send(myJson);
        })
        .catch(err => {
          console.log(err);
          res.status(500).send('Spotify search request error');
        })
    }
  }).catch(spotifyTokenError => {
    console.log(spotifyTokenError);
    res.status(500).send('Spotify auth request error');
  })

})

app.get('/health', (req, res) => {
  res.send({ status: "App is up and running" });
})

app.get('/auth', (req, res) => {
  getSpotifyToken().then(response => {
    res.send(response);
  }).catch(err => {
    console.log(err);
    res.status(500).send('Spotify auth request error');
  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
