import express from 'express';
import needValidUser from '../middleware/need-valid-user.mjs';
import { registeredUsers } from '../../hit-ejabberd-api.mjs';

const routerUser = express.Router();
export default routerUser;

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

routerUser.post('/', needValidUser, express.json(), pageList);
