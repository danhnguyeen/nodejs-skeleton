import jwt from 'jsonwebtoken';
import config from 'config';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).send('Access deny');
    }
    const user = jwt.verify(token, config.get('JWT_KEY'));
    /* need to check expires time */
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).send('Access deny');
  }
};
