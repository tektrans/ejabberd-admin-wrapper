import axios from 'axios';
import constants from './constants.mjs';
import logger from './logger.mjs';

const MODULE_NAME = 'HIT-EJABBERD-API';

const axiosInstance = axios.create({
  baseURL: constants.ejabberdApiBaseUrl,
  auth: {
    username: constants.ejabberdAdminUsername,
    password: constants.ejabberdAdminPassword
  }
});

const registeredUsers = async (traceId, host) => {
  try {
    const response = await axiosInstance.post('/api/registered_users', { host });
    return response?.data;
  } catch (e) {
    const newE = new Error(`${MODULE_NAME} DB6996F6: Exception on registeredUsers`);

    /**
     * @type {import('axios').AxiosResponse}
     */
    const eResponse = e.response;

    logger.warn(newE.message, {
      traceId,
      eCode: e.code,
      eMessage: e.message || e.toString(),
      responseStatus: eResponse?.status,
      responseData: eResponse?.data
    });

    throw newE;
  }
};

const register = async (traceId, user, host, password) => {
  try {
    const response = await axiosInstance.post('/api/register', { user, host, password });
    return response?.data;
  } catch (e) {
    /**
     * @type {import('axios').AxiosResponse}
     */
    const eResponse = e.response;

    if (eResponse?.status === 409) {
      const newE = new Error(`${MODULE_NAME} C99CDA6E: User registered already`);
      newE.code = 'DUPLICATE';

      logger.warn(newE.message, { traceId });

      throw newE;
    }

    const newE = new Error(`${MODULE_NAME} BF113435: Exception on register`);

    logger.warn(newE.message, {
      traceId,
      eCode: e.code,
      eMessage: e.message || e.toString(),
      responseStatus: eResponse?.status,
      responseData: eResponse?.data
    });

    throw newE;
  }
};

export {
  register,
  registeredUsers
};
