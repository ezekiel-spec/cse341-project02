const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/', require('./swagger-router'));
router.use('/movies', require('./movies'));
router.use('/actors', require('./actors'));

// 1. Login Route: This redirects the user to GitHub
router.get('/login', passport.authenticate('github', (req, res) => {}));

// 2. Logout Route: This clears the session
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// 3. Callback Route: GitHub sends the user back here with a 'code'
// This is the part that was missing and causing the error!
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', 
    session: false // We handle the session manually below
}), (req, res) => {
    // This line is CRITICAL: it saves the user data into your session
    req.session.user = req.user; 
    res.redirect('/');
});

module.exports = router;