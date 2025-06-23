// import logger from '../../logger.mjs';
import { compareUsernamePassword } from '../../models/users.mjs';

// const MODULE_NAME = 'MIDDLEWARE.NEED-VALID-USER';

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const needValidUser = async (req, res, next) => {
  const { traceId } = res.locals;
  const authHeader = req.get('authorization');

  if (!authHeader) {
    res.set('WWW-Authenticate', 'Basic');
    res.status(401).json({
      traceId,
      status: 401,
      message: 'Need basic authentication'
    });

    return;
  }

  const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

  const matched = await compareUsernamePassword(traceId, username, password);

  if (!matched) {
    res.status(401).json({
      traceId,
      status: 403,
      message: 'Forbidden!'
    });

    return;
  }

  res.locals.authUser = username;

  next();
};

export default needValidUser;
