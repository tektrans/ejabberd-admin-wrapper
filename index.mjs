/* eslint-disable import/first */
process.cwd(import.meta.dirname);

import constants from './lib/constants.mjs';
import logger from './lib/logger.mjs';
import initWebUI from './lib/webui/index.mjs';

const MODULE_NAME = 'MAIN';
logger.info(`${MODULE_NAME} 6373B0B4: Initializing`, {
  version: constants.version
});

await initWebUI();

logger.info(`${MODULE_NAME} 55E28073: Initialized`, {
  version: constants.version,
  localUrl: `http://localhost:${constants.webuiListenPort}`,
  baseUrl: constants.webuiBaseUrl
});
