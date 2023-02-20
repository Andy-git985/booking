const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const userExtractor = (request, response, next) => {
  const token = request.cookies.jwt;
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (decodedToken.id) {
      request.user = decodedToken.id;
    }
  }
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  console.log('===================');
  console.log('=====middleware====');
  console.log('===================');
  console.log('error name', error.name);
  console.log('===================');
  console.log('===================');
  console.log('===================');
  if (error.name === 'CastError') {
    return response
      .status(400)
      .send({ success: false, message: 'malformatted id' });
  } else if (error.name === 'TypeError') {
    return response
      .status(400)
      .send({ success: false, message: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  userExtractor,
  errorHandler,
};
