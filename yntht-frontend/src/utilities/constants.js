const PAGES = {
  FEED: {
    name: 'Feed',
    presentInMenu: true,
  },
  MY3: {
    name: 'My 3',
    presentInMenu: true,
  },
  HISTORY: {
    name: 'History',
    presentInMenu: true,
  },
  PROFILE: {
    name: 'Profile',
    presentInMenu: true,
  },
  SEARCH_RESULTS: {
    name: 'Search Results',
    presentInMenu: false,
  },
};

const ERROR_PAGES = {
  NOT_FOUND: {
    title: '404',
    subtitle: "This page doesn't exist.",
    text: 'Try going to the homepage.',
  },
  OOPS: {
    title: 'Oops!',
    subtitle: 'Looks like something went wrong.',
    text: 'Try going to the homepage.',
  },
};

const AVATAR_COLORS = [
  '#1A9CFC',
  '#FF5B5B',
  '#865BFF',
  '#FFAA5B',
  '#5BD9FF',
];

module.exports = { PAGES, ERROR_PAGES, AVATAR_COLORS };
