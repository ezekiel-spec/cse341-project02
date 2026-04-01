const isAuthenticated = (req, res, next) => {
  // Passport adds the 'isAuthenticated' method to the request object
  if (req.session.user === undefined) {
    return res.status(401).json("You do not have access. Please log in.");
  }
  next();
};

module.exports = {
  isAuthenticated
};