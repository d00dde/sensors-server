const { Router } = require('express');
const { adminAuth } = require('../middlewares/auth.middleware');
const db = require('../database');
const { catchErrors, responseHandler } = require('../utils');

const router = Router();

router.post('/add', [adminAuth], async (req, res) => {
  try {
    const sensor = await db.addSensor(
      req.body.description,
      req.body.channels,
      req.user.userID,
      'none',
      'none',
    );
    const { _id, description, channels, owner } = sensor;
    res.status(201).json({ _id, description, channels, owner });
  } catch (err) {
    errorHandler(err, res);
  }
});

/*router.put('/:id', [userAuth], async (req, res) => {
  try {
    const sensor = await db.getSensor(req.params.id);
    if (!isOwner(req, sensor)) {
      return responseHandler(false);
    }
    const isUpdated = await db.updateSensor(
      req.params.id,
      req.body.description,
      req.body.channels,
    );
    responseHandler(isUpdated, res);
  } catch (err) {
    errorHandler(err, res);
  }
});

router.delete('/:id', [userAuth], async (req, res) => {
  try {
    const sensor = await db.getSensor(req.params.id);
    if (!isOwner(req, sensor)) {
      return responseHandler(false);
    }
    const isDeleted = await db.deleteSensor(req.params.id);
    responseHandler(isDeleted, res);
  } catch (err) {
    errorHandler(err, res);
  }
});

router.get('/', [userAuth], async (req, res) => {
  try {
    let sensors = await db.getAllSensors(req.user.userID);
    sensors = sensors.map(({ _id, description, channels, owner }) => {
      return { _id, description, channels, owner };
    });
    responseHandler(true, res, sensors);
  } catch (err) {
    errorHandler(err, res);
  }
});

router.get('/:id', [userAuth], async (req, res) => {
  try {
    const sensor = await db.getSensor(req.params.id);
    if (isOwner(req, sensor)) {
      return responseHandler(!!sensor, res, sensor);
    }
    return responseHandler(false);
  } catch (err) {
    errorHandler(err, res);
  }
});*/

module.exports = router;
