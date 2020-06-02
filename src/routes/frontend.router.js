const { Router } = require('express');
const Link = require('../models/Link');
const auth = require('../middlewares/auth.middleware');
const config = require('config');
const shortId = require('shortid');
const router = Router();

router.post('/add', auth, async (req, res) => {
  try {
    const baseURL = config.get('baseURL');
    const { from } = req.body;
    const code = shortId.generate();

    const existing = await Link.findOne({ from });
    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseURL + '/t/' + code;
    const link = new Link({
      code,
      from,
      to,
      owner: req.user.userID,
    });
    await link.save();

    res.status(201).json({ link });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userID });
    res.json(links);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
});

module.exports = router;
