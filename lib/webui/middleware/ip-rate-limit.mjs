import { rateLimit } from 'express-rate-limit';

const ipRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 60
});

export default ipRateLimit;
