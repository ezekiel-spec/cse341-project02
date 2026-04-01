const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/', require('./swagger-router'));
router.use('/movies', require('./movies'));
router.use('/actors', require('./actors'));

// Login Route: This redirects the user to GitHub
router.get('/login', passport.authenticate('github', (req, res) => {}));

// Logout Route: This clears the session
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;