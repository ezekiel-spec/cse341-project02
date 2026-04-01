const express = require('express');
const router = express.Router();

router.use('/', require('./swagger-router')); 
router.use('/movies', require('./movies'));
router.use('/actors', require('./actors'));

module.exports = router;

const passport = require('passport');

// Login Route
router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Logout Route
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// Callback Route
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});