const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const { getSpotifyToken } = require('../utilities/spotifyAuth')

const spotifySearchUrl = "https://api.spotify.com/v1/search";
const searchTypes = "album,track,artist";
const searchResponseLimit = 30;

// Search spotify api
router.get('/api/search', (req, res) => {

  getSpotifyToken().then(spotifyToken => {

    const searchTerm = req.query.q;

    if (!searchTerm) {
      res.status(400).send('No search term provided');
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
          res.status(200).send(myJson);
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

module.exports = router;
