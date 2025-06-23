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

export {
  registeredUsers
};
