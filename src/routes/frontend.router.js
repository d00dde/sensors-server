const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const db = require('../database/mongoDB');
// const config = require('config');
// const shortId = require('shortid');
const router = Router();

router.post('/add', auth, async (req, res) => {
  try {
    // const baseURL = config.get('baseURL');
    const sensor = db.addSensor(
      req.body.description,
      req.body.channels,
      req.user.userID,
    );
    /* const { from } = req.body;
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
    await link.save();*/

    res.status(201).json({ sensor });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
});
router.put('/:id', auth, async (req, res) => {
  await db.updateSensor(req.params.id, req.body.description, req.body.channels);
  res.status(204).json({});
});
router.delete('/:id', auth, async (req, res) => {
  await db.deleteSensor(req.params.id);
  res.status(204).json({});
});
router.get('/', auth, async (req, res) => {
  try {
    const sensors = await db.getAllSensors(req.user.userID);
    res.json(sensors);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const sensor = await db.getSensor(req.params.id);
    res.json(sensor);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
});

module.exports = router;
