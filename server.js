const express = require('express');
const cors = require('cors');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(cors())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});