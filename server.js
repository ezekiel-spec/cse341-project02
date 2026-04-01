const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();

// --- 1. Middleware Setup ---
app
  .use(bodyParser.json())
  // Session must be defined before passport.session()
  .use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use(cors({ methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
  .use(cors({ origin: '*'}))
  .use('/', require('./routes'));

// --- 2. Passport Strategy Configuration ---
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // In a real app, you might save the profile to your database here
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// --- 3. Exception Handling (Optional but recommended) ---
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// --- 4. Database Initialization and Server Start ---
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    const port = process.env.PORT || 8080;
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});