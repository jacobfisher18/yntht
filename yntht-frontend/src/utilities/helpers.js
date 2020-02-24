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

export const logout = () => {
  const cookies = new Cookies();
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
