const jwt = require('jsonwebtoken');
const config = require('config');
const db = require('../database');

const middleware = (checkPremissions) => {
  return async (req, res, next) => {
    if (req.method === 'OPTIONS') {
      return next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Ошибка авторизации' });
      }
      const decoded = jwt.verify(token, config.get('jwtSecret'));
      const access = await checkPremissions(decoded);
      if (access) {
        req.user = decoded;
        return next();
      }
      return res.status(401).json({ message: 'Ошибка авторизации' });
    } catch (err) {
      res.status(401).json({ message: 'Ошибка авторизации' });
    }
  };
};

module.exports = {
  userAuth: middleware(async (decoded) => {
    return true;
  }),
  adminAuth: middleware(async (decoded) => {
    if (await db.isAdmin(decoded.userID)) {
      return true;
    }
    return false;
  }),
  masterAuth: middleware(async (decoded) => {
    if (await db.isMaster(decoded.userID)) {
      return true;
    }
    return false;
  }),
};
