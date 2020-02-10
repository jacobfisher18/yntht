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

module.exports = { PAGES }