import express from 'express';
import needValidUser from '../middleware/need-valid-user.mjs';
import { register, registeredUsers } from '../../hit-ejabberd-api.mjs';
import logger from '../../logger.mjs';

const routerUser = express.Router();
export default routerUser;

const MODULE_NAME = 'WEBUI.ROUTER.USERS';

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const pageList = async (req, res) => {
  const { traceId } = res.locals;
  const { host } = req.body;

  const result = await registeredUsers(traceId, host);

  res.json({
    traceId,
    status: 200,
    ts: new Date(),
    method: req.originalUrl,
    result
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const pageRegister = async (req, res) => {
  const { traceId } = res.locals;
  const { user, host, password } = req.body;

  try {
    const result = await register(traceId, user, host, password);

    logger.info(`${MODULE_NAME} 4F0E5813: New user registered`, {
      traceId,
      user,
      host,
      submitter: res.locals.authUser
    });

    res.json({
      traceId,
      status: 200,
      ts: new Date(),
      method: req.originalUrl,
      result
    });
  } catch (e) {
    if (e.code === 'DUPLICATE') {
      res.status(409).json({
        traceId,
        status: 409,
        ts: new Date(),
        method: req.originalUrl,
        result: 'Duplicate'
      });

      return;
    }

    res.status(500).json({
      traceId,
      status: 500,
      ts: new Date(),
      method: req.originalUrl,
      result: 'EXCEPTION'
    });
  }
};

routerUser.post('/', needValidUser, express.json(), pageList);
routerUser.post('/register', needValidUser, express.json(), pageRegister);
