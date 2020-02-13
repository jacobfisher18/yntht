// returns a comma separated list of artists given an artists array
const getArtist = (artists) => {
  let separator = "";
  let result = "";
  artists.forEach(artist => {
    result += separator + artist.name;
    separator = ", ";
  })
  return result;
}

module.exports = { getArtist }