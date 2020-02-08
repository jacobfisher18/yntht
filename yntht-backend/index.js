const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { connectToDB } = require('./utilities/dbConnection')

const port = 5000

// db connection
let connection;

// get request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// import routes
app.use(require('./routes/spotify'));
app.use(require('./routes/users'));
app.use(require('./routes/my3'));

// health check
app.get('/health', (req, res) => {
  res.send({ status: "App is up and running" });
})

// listen on specified port
app.listen(port, () => {
  console.log(`App listening on port ${port}!`)

  connectToDB().then((threadID) => {
    console.log(`connected to DB with threat ID: ${threadID}`)
  }).catch((err) => {
    console.log(`error connecting to DB: ${err}`)
  });
})
