const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const db = require('../database');
const catchErrors = require('../utils').catchErrors;

const router = Router();

const validators = [
  check('email', 'Некорректный email.').isEmail(),
  check('password', 'Слишком короткий пароль (минимум 6 символов).').isLength({
    min: 6,
  }),
];
const validate = (req, res) => {
  const validatorErrors = validationResult(req);
  if (!validatorErrors.isEmpty()) {
    res.status(400).json({
      errors: validatorErrors.array(),
      message: 'Некорректные данные',
    });
    return false;
  }
  return true;
};

router.post(
  '/register',
  [validators],
  catchErrors(async (req, res) => {
    if (!validate(req, res)) return;
    const { email, name, password } = req.body;
    const candidate = await db.findUser(email);
    if (candidate) {
      return res
        .status(400)
        .json({ message: 'Такой пользователь уже существует.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = 'user';
    await db.createUser(email, name, hashedPassword, role);
    res.status(201).json({ message: 'Пользователь создан.' });
  }),
);

// api/auth/login/
router.post(
  //TODO: возможен множественный вход одного и того же пользователя.
  '/login',
  [validators],
  catchErrors(async (req, res) => {
    if (!validate(req, res)) return;
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
      role: user.role,
      message: 'Успешный вход в систему',
    });
  }),
);
module.exports = router;
