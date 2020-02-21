const express = require('express')
const app = express()
const path = require("path");
const bodyParser = require('body-parser');
const { connectToDB } = require('./utilities/dbConnection');
const usersRoutes = require('./routes/users');

const port = 5000

// db connection
let connection;

// use static files from /build
app.use(express.static(path.join(__dirname, 'build')));

// get request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// import routes
app.use(require('./routes/spotify'));
app.use(usersRoutes);
app.use(require('./routes/my3'));

// health check
app.get('/api/health', (req, res) => {
  res.send({ status: "App is up and running" });
})

// serve the built frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// listen on specified port
app.listen(port, () => {
  console.log(`App listening on port ${port}!`)

  connectToDB().then(threadID => {
    console.log(`connected to DB with threat ID: ${threadID}`)
  }).catch(err => {
    console.log(`error connecting to DB: ${err}`);
    // To-Do: if we couldn't connect to the db, we can't do anything
    // We should block all api paths because they otherwise will cause a fatal error when trying to connect to the db
  });
})
