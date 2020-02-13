const PAGES = {
  FEED: {
    name: "Feed",
    bgColor: "#BCA6CE",
    highlightColor: "#FCE849",
    presentInMenu: true,
  },
  MY3: {
    name: "My 3",
    bgColor: "#24316E",
    highlightColor: "#FCFF2B",
    presentInMenu: true,
  },
  HISTORY: {
    name: "History",
    bgColor: "#EF3EA5",
    highlightColor: "#CFF36E",
    presentInMenu: false, // this is an upcoming feature
  },
  PROFILE: {
    name: "Profile",
    bgColor: "#91DBCD",
    highlightColor: "#FA4739",
    presentInMenu: true,
  },
  SEARCH_RESULTS: {
    name: "Search Results",
    bgColor: "#DA6990",
    highlightColor: "#0B6450",
    presentInMenu: false,
  }
}

const ERROR_PAGES = {
  NOT_FOUND: {
    title: '404',
    subtitle: "This page doesn't exist.",
    text: 'Try going to the homepage.',
  },
  OOPS: {
    title: 'Oops!',
    subtitle: 'Looks like something went wrong.',
    text: 'This was probably something that went wrong on our side.',
  }
}

module.exports = { PAGES, ERROR_PAGES }