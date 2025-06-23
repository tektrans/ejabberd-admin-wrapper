import logger from './logger.mjs';

const MODULE_NAME = 'SD-NOTIFY';

export default async () => {
  if (process.ppid !== 1) {
    logger.debug(`${MODULE_NAME} 7845512C: Not a systemd unit, no need to sending systemd ready notification`, {
      ppid: process.ppid
    });
    return;
  }

  try {
    const { default: sdNotify } = await import('sd-notify');
    sdNotify.ready();
    logger.verbose(`${MODULE_NAME} 7845512C: Systemd ready notification has been sent`);
  } catch (e) {
    logger.warn(`${MODULE_NAME} 7845512C: Running as a systemd unit, but optional sd-notify module not found`, {
      eCode: e.code,
      eMessage: e.message || e.toString()
    });
  }
};
