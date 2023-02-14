const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  console.log('error message', error.message);
  console.log(error.name);
  next(error);
};

module.exports = {
  requestLogger,
  errorHandler,
};