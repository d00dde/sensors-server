const { Router } = require('express');
const { userAuth } = require('../middlewares/auth.middleware');
const db = require('../database');
const { responseHandler, catchErrors } = require('../utils');
const router = Router();

router.use(userAuth);

const isOwner = (req, sensor) => {
  if (req.user.userID === sensor.owner) {
    return true;
  }
  return false;
};

router.post(
  '/add',
  catchErrors(async (req, res) => {
    const sensor = await db.addSensor(
      req.body.description,
      req.body.channels,
      req.user.userID,
      'none',
      'none',
    );
    const { _id, description, channels, owner } = sensor;
    res.status(201).json({ _id, description, channels, owner });
  }),
);

router.put(
  '/:id',
  catchErrors(async (req, res) => {
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
  }),
);

router.delete(
  '/:id',
  catchErrors(async (req, res) => {
    const sensor = await db.getSensor(req.params.id);
    if (!isOwner(req, sensor)) {
      return responseHandler(false);
    }
    const isDeleted = await db.deleteSensor(req.params.id);
    responseHandler(isDeleted, res);
  }),
);

router.get(
  '/',
  catchErrors(async (req, res) => {
    let sensors = await db.getAllSensors(req.user.userID);
    sensors = sensors.map(({ _id, description, channels, owner }) => {
      return { _id, description, channels, owner };
    });
    responseHandler(true, res, sensors);
  }),
);

router.get(
  '/:id',
  catchErrors(async (req, res) => {
    const sensor = await db.getSensor(req.params.id);
    if (isOwner(req, sensor)) {
      return responseHandler(!!sensor, res, sensor);
    }
    return responseHandler(false);
  }),
);

module.exports = router;
