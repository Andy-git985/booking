const jwt = require('jsonwebtoken');

const create = (user) => {
  const userForToken = {
    id: user._id,
  };

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  return token;
};

module.exports = { create };
