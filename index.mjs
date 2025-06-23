/* eslint-disable import/first */
process.cwd(import.meta.dirname);

import logger from './lib/logger.mjs';
import initWebUI from './lib/webui/index.mjs';

const MODULE_NAME = 'MAIN';
logger.info(`${MODULE_NAME} 6373B0B4: Initializing`);

await initWebUI();
