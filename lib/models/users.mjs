import bcrypt from 'bcrypt';
import logger from '../logger.mjs';
import { pool } from '../mysql.mjs';

const MODULE_NAME = 'MODELS.USERS';

/**
 * @typedef User
 * @type {object}
 * @property {string} uuid
 * @property {string} username
 * @property {string} password - hashed password
 * @property {Date} created
 * @property {number} disabled
 */

/**
 *
 * @param {string} traceId
 * @param {string} username
 * @returns {Promise<User>}
 */

const getByUsername = async (traceId, username) => {
  const query = 'SELECT SQL_CACHE * FROM users WHERE username = ? AND disabled = 0';
  const values = [username];

  try {
    const [result] = await pool.query(query, values);
    return result?.[0];
  } catch (e) {
    const newE = new Error(`${MODULE_NAME} AE3E6CBD: Exception on getByUsername`);

    logger.warn(newE.message, {
      traceId,
      eCode: e.code,
      eMessage: e.message || e.toString()
    });

    throw newE;
  }
};

/**
 *
 * @param {string} traceId
 * @param {string} username
 * @param {string} password
 * @returns {Promise<boolean>}
 */
const compareUsernamePassword = async (traceId, username, password) => {
  const user = await getByUsername(traceId, username);

  if (!user) return false;

  const result = await bcrypt.compare(password, user.password);
  return result;
};

export {
  getByUsername,
  compareUsernamePassword
};
