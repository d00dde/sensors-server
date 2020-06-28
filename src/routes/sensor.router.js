const { Router } = require('express');
const db = require('../database');
const { responseHandler, catchErrors } = require('../utils');
const router = Router();
const alert = require('../alert');

router.post(
  '/:id',
  catchErrors(async (req, res) => {
    const sensor = await db.getSensorBySystemId(req.params.id);
    if(!sensor)
      return responseHandler(false, res);
    if(!validateRequest(req.params.id, req.body, sensor.secret))
      return responseHandler(false, res);
    const isSave = await db.addEvent(req.params.id, req.body.code, req.body.message);
    if(!isSave)
      return responseHandler(false, res);
    alert(sensor.channels, req.body.message);
    return res.status(201).json({});
  }),
);

module.exports = router;

function validateRequest(id, body, secret) {
  return true;
}