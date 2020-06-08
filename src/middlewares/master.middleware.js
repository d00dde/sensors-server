const jwt = require('jsonwebtoken');
const config = require('config');
const db = require('../database');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Ошибка авторизации' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));
    if(!db.isMaster(req.user.userID)) {
      return res.status(401).json({ message: 'Ошибка авторизации' });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Ошибка авторизации' });
  }
};