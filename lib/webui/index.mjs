import express from 'express';
import uniqid from 'uniqid';
import constants from '../constants.mjs';
import logger from '../logger.mjs';
import needValidUser from './middleware/need-valid-user.mjs';

const MODULE_NAME = 'WEBUI';

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const preRequestMiddleware = (req, res, next) => {
  res.locals.traceId = uniqid();

  next();
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const rootHandler = (req, res) => {
  const { traceId } = res.locals;

  res.json({
    traceId,
    status: 200,
    ts: new Date(),
    method: req.originalUrl,
    message: {
      appTitle: constants.appTitle,
      version: constants.version,
      copyright: constants.copyright
    }
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const pingHandler = (req, res) => {
  const { traceId } = res.locals;

  res.json({
    traceId,
    status: 200,
    ts: new Date(),
    method: req.originalUrl,
    message: 'PONG'
  });
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const checkHandler = (req, res) => {
  const { traceId } = res.locals;

  res.json({
    traceId,
    status: 200,
    ts: new Date(),
    method: req.originalUrl,
    message: 'Yes, your credential is valid'
  });
};

const initWebUI = (traceId) => new Promise((resolve) => {
  const app = express();

  app.use(preRequestMiddleware);

  app.get('/', rootHandler);
  app.get('/ping', pingHandler);
  app.get('/check', needValidUser, checkHandler);

  app
    .listen(constants.webuiListenPort, () => {
      logger.info(`${MODULE_NAME} 0F83D614: Listening for HTTP request`, {
        traceId,
        listenPort: constants.webuiListenPort
      });

      resolve();
    })
    .on('error', (e) => {
      logger.error(`${MODULE_NAME} AA205828: Exception on listening`, {
        traceId,
        listenPort: constants.webuiListenPort,
        eCode: e.code,
        eMessage: e.message || e.toString()
      });

      process.exit(1);
    });
});

export default initWebUI;
