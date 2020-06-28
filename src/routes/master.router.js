const { Router } = require('express');
const { masterAuth } = require('../middlewares/auth.middleware');
const db = require('../database');
const { responseHandler, catchErrors } = require('../utils');
const router = Router();

router.use(masterAuth);

router.delete(
  '/deleteUser/:id',
  catchErrors(async (req, res) => {
    const isDeleted = await db.deleteUser(req.params.id);
    responseHandler(isDeleted, res);
  }),
);

router.put(
  '/setRights/:id',
  catchErrors(async (req, res) => {
  	const user = await db.getUser(req.params.id);
  	if(!user)
  		return responseHandler(false, res);
  	if(user.role === 'master')
  		return responseHandler(false, res);
  	if(req.body.role === 'master')
  		return responseHandler(false, res);
  	if(req.body.role !== 'admin' &&  req.body.role !== 'user')
  		return responseHandler(false, res);
   	const isChanged = await db.changeRole(req.params.id, req.body.role);
    responseHandler(isChanged, res);
  }),
);

module.exports = router;
