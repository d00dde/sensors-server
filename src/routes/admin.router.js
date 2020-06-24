const { Router } = require('express');
const { adminAuth } = require('../middlewares/auth.middleware');
const db = require('../database');
const { responseHandler, catchErrors } = require('../utils');
const router = Router();

router.use(adminAuth);

router.get(
  '/users',
  catchErrors(async (req, res) => {
    let users = await db.getUsers();
    users = users.map(({ id, email, name, role }) => {
      return { id, email, name, role };
    });
    responseHandler(true, res, users);
  }),
);

router.get(
  '/sensors/:id',
  catchErrors(async (req, res) => {
    let sensors = await db.getAllSensors(req.params.id);
    sensors = sensors.map(({ _id, description, channels, owner, systemID, secret }) => {
      return { _id, description, channels, owner, systemID, secret };
    });
    responseHandler(true, res, sensors);
  }),
);

router.post(
  '/addSensor/:id',
  catchErrors(async (req, res) => {
    await db.addSensor(
      req.body.description,
      req.body.channels,
      req.params.id,
      req.body.systemID,
      req.body.secret,
    );
    res.status(201).json({});
  }),
);

router.put(
  '/updateSensor/:id',
  catchErrors(async (req, res) => {
    const isUpdated = await db.updateSensor(
      req.params.id,
      req.body.description,
      req.body.channels,
      req.body.systemID,
      req.body.secret,
    );
    responseHandler(isUpdated, res);
  }),
);

router.delete(
  '/deleteSensor/:id',
  catchErrors(async (req, res) => {
    const isDeleted = await db.deleteSensor(req.params.id);
    responseHandler(isDeleted, res);
  }),
);

module.exports = router;
