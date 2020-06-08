const { Router } = require('express');
const userAuth = require('../middlewares/user.middleware');
const db = require('../database');
const catchErrors = require('../utils').catchErrors;

const router = Router();

const responseHandler = (isExist, res, data = null) => {
  if (isExist) {
    if (data) res.status(200).json(data);
    else res.status(204).json({});
  } else {
    res.status(404).json({ message: 'Такого датчика не существует.' });
  }
};

router.post(
  '/add',
  userAuth,
  catchErrors(async (req, res) => {
    const sensor = await db.addSensor(
      req.body.description,
      req.body.channels,
      req.user.userID,
    );
    res.status(201).json({ sensor });
  }),
);
router.put(
  '/:id',
  userAuth,
  catchErrors(async (req, res) => {
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
  userAuth,
  catchErrors(async (req, res) => {
    const isDeleted = await db.deleteSensor(req.params.id);
    responseHandler(isDeleted, res);
  }),
);
router.get(
  '/',
  userAuth,
  catchErrors(async (req, res) => {
    const sensors = await db.getAllSensors(req.user.userID);
    responseHandler(true, res, sensors);
  }),
);
router.get(
  '/:id',
  userAuth,
  catchErrors(async (req, res) => {
    const sensor = await db.getSensor(req.params.id);
    responseHandler(!!sensor, res, sensor);
  }),
);
module.exports = router;
