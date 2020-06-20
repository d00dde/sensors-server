const { Router } = require('express');
const { adminAuth } = require('../middlewares/auth.middleware');
const db = require('../database');
const { responseHandler, catchErrors } = require('../utils');
const router = Router();

router.use(adminAuth);

/*const isOwner = (req, sensor) => {
  if (req.user.userID === sensor.owner) {
    return true;
  }
  return false;
};*/

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

/*router.get(
  '/:id',
  catchErrors(async (req, res) => {
    const sensor = await db.getSensor(req.params.id);
    if (isOwner(req, sensor)) {
      return responseHandler(!!sensor, res, sensor);
    }
    return responseHandler(false);
  }),
);*/

module.exports = router;
