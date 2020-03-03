import Cookies from 'universal-cookie';
import { AVATAR_COLORS } from './constants';

// one time setup to use cookies
const cookies = new Cookies();

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
  cookies.set('user_id', userID, {
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.yntht.net' : 'localhost',
  });
  cookies.set('username', username, {
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.yntht.net' : 'localhost',
  });
};

// boolean for if the user is logged in (based on the cookie)
export const isLoggedIn = () => cookies.get('user_id') && cookies.get('username');

// user_id, from cookie
export const getCurrentUserID = () => Number(cookies.get('user_id'));

// user_id, from cookie
export const getCurrentUsername = () => cookies.get('username');

// set the document to the specified background color
export const setBackgroundColor = (color) => {
  document.body.style.backgroundColor = color;
};

export const logout = () => {
  cookies.remove('user_id', {
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.yntht.net' : 'localhost',
  });
  cookies.remove('username', {
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.yntht.net' : 'localhost',
  });

  // force window reload to redirect to Landing
  window.location.reload();
};

export const onlyUnique = (value, index, self) => {
  const matchingItems = self.filter((obj) => obj.name === value.name && getArtist(obj.artists) === getArtist(value.artists));

  return !(matchingItems.length >= 2 && matchingItems[0].id !== value.id);
};

export const songIsNull = (song) => (!song.title || !song.artist || !song.img);

export const getColorFromString = (str) => {
  const sumString = str.split('').reduce((a, b) => a + b.charCodeAt(0), 0);

  const index = sumString % AVATAR_COLORS.length;

  return AVATAR_COLORS[index];
};
