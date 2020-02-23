const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { getSpotifyToken } = require('../utilities/spotifyAuth');

const spotifySearchUrl = "https://api.spotify.com/v1/search";
const searchTypes = "album,track,artist";
const searchResponseLimit = 30;

// Search Spotify api
router.get('/spotify/search', (req, res) => {

  getSpotifyToken().then(spotifyToken => {

    const searchTerm = req.query.q;

    if (!searchTerm) {
      res.status(400).send({ error: 'No search term provided.' });
      return;
    }

    const requestUrl = `${spotifySearchUrl}?q=${searchTerm}&type=${searchTypes}&limit=${searchResponseLimit}`

    fetch(requestUrl, {
      mode: 'no-cors',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${spotifyToken}` }
    })
      .then(response => response.json())
      .then(myJson => {
        console.log('myJson', myJson); // temp for development
        res.status(200).send(myJson);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ error: 'Spotify search request error.' });
      });
  }).catch(spotifyTokenError => {
    console.log(spotifyTokenError);
    res.status(500).send({ error: 'Spotify auth request error.' });
  });
})

module.exports = router;
