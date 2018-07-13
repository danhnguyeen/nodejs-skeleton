const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.decode(token, process.env.JWT_KEY);
    req.user = user;
    req.token = token;
    next();
  } catch(err) {
    res.status(401).send(err);
  }
};