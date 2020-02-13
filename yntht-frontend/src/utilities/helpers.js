import Cookies from 'universal-cookie';

// returns a comma separated list of artists given an artists array
export const getArtist = (artists) => {
  let separator = "";
  let result = "";
  artists.forEach(artist => {
    result += separator + artist.name;
    separator = ", ";
  })
  return result;
}

// set cookies for logged in user
export const setUserCookies = (userID, username) => {
  const cookies = new Cookies();
  cookies.set('user_id', userID, { path: '/' });
  cookies.set('username', username, { path: '/' });
}
