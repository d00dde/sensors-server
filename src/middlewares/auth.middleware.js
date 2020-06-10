const jwt = require('jsonwebtoken');
const config = require('config');
const db = require('../database');

const middleware = (checkPremissions) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      return next();
    }

    try {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Ошибка авторизации' });
      }
      const decoded = jwt.verify(token, config.get('jwtSecret'));
      if (!checkPremissions(decoded)) {
        return res.status(401).json({ message: 'Ошибка авторизации' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Ошибка авторизации' });
    }
  };
};

module.exports = {
  userAuth: middleware((decoded) => {
    return true;
  }),
  adminAuth: middleware((decoded) => {
    if (db.isAdmin(decoded.userID)) {
      return true;
    }
    return false;
  }),
  masterAuth: middleware((decoded) => {
    if (db.isMaster(decoded.userID)) {
      return true;
    }
    return false;
  }),
};
