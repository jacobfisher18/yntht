import Cookies from 'universal-cookie';

// returns a comma separated list of artists given an artists array
export const getArtist = (artists) => {
  let separator = '';
  let result = '';
  artists.forEach((artist) => {
    result += separator + artist.name;
    separator = ', ';
  });
  return result;
};

// set cookies for logged in user
export const setUserCookies = (userID, username) => {
  const cookies = new Cookies();
  cookies.set('user_id', userID, {
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.yntht.net' : 'localhost',
  });
  cookies.set('username', username, {
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.yntht.net' : 'localhost',
  });
};

// set the document to the specified background color
export const setBackgroundColor = (color) => {
  document.body.style.backgroundColor = color;
};
