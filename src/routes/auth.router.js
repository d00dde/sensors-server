const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const db = require('../database/mongoDB');

const router = Router();

router.post(
  '/register',
  [
    check('email', 'Некорректный email.').isEmail(),
    check('password', 'Слишком короткий пароль (минимум 6 символов).').isLength(
      { min: 6 },
    ),
  ],
  async (req, res) => {
    try {
      const validatorErrors = validationResult(req);
      if (!validatorErrors.isEmpty()) {
        return res.status(400).json({
          errors: validatorErrors.array(),
          message: 'Некорректные данные при регистрации.',
        });
      }
      const { email, name, password } = req.body;
      const candidate = await db.findUser(email);

      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Такой пользователь уже существует.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.createUser(email, name, hashedPassword);
      res.status(201).json({ message: 'Пользователь создан.' });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: 'Ошибка сервера.' });
    }
  },
);

// api/auth/login/
router.post(
  //TODO: возможен множественный вход одного и того же пользователя.
  '/login',
  [
    check('email', 'Некорректный email.')
      .normalizeEmail()
      .isEmail(),
    check('password', 'Введите пароль.').exists(),
  ],
  async (req, res) => {
    try {
      const validatorErrors = validationResult(req);

      if (!validatorErrors.isEmpty()) {
        return res.status(400).json({
          errors: validatorErrors.array(),
          message: 'Некорректные данные при регистрации.',
        });
      }

      const { email, password } = req.body;
      const user = await db.findUser(email);
      if (!user) {
        return res.status(400).json({ message: 'Ошибка авторизации.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        //здесь может быть защита от bruteforce.
        return res.status(400).json({ message: 'Ошибка авторизации.' });
      }

      const token = jwt.sign({ userID: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h',
      });
      res.json({
        token,
        userName: user.name,
        message: 'Успешный вход в систему',
      });
    } catch (e) {
      console.log(err.message);
      res.status(500).json({ message: 'Ошибка сервера.' });
    }
  },
);
module.exports = router;
