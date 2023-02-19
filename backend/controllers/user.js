const bcrypt = require('bcrypt');
// const config = require('../utils/config');
const usersRouter = require('express').Router();
const User = require('../models/User');
const jwtToken = require('../utils/jwtToken');

usersRouter.post('/register', async (request, response) => {
  const { email, password, role } = request.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return response.status(400).json({ error: 'username must be unique' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    email,
    passwordHash,
    role,
  });
  await newUser.save();

  const token = jwtToken.create(newUser);

  response.cookie('jwt', token, { httpOnly: true, sameSite: 'lax' });
  response.status(201).send({ token, newUser });
});

usersRouter.post('/login', async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const token = jwtToken.create(user);

  response.cookie('jwt', token, { httpOnly: true, sameSite: 'lax' });
  response.status(201).send({ message: 'Successfully logged in', user });
});

usersRouter.post('/logout', async (request, response) => {
  response
    .clearCookie('jwt')
    .status(200)
    .json({ message: 'Successfully logged out' });
});

usersRouter.get('/account', async (request, response) => {
  const user = await User.findById(request.user);
  response.status(200).json(user);
});

// usersRouter.put('/account/email', async (request, response) => {
//   const user = await User.findById(request.user);
//   const { email } = request.body;
//   console.log('user', user);
//   console.log('request user', request.user);
//   console.log('request body', request.body);
//   user.email = email;
//   await user.save();
//   response.status(204).json(user);
// });

// usersRouter.put('/account/password', async (request, response) => {
//   const user = await User.findById(request.user);
//   const { oldPassword, newPassword, newPasswordConfirm } = request.body;
//   const passwordCorrect = user
//     ? await bcrypt.compare(oldPassword, user.passwordHash)
//     : false;
//   if (passwordCorrect && newPassword === newPasswordConfirm) {
//     const saltRounds = 10;
//     const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
//     user.passwordHash = newPasswordHash;
//     await user.save();
//     response.status(204).json(user);

//     // response.status().json(user)
//   } else {
//     response.status(401).json({
//       error: 'invalid  password',
//     });
//   }
// });

// usersRouter.delete('/account', async (request, response) => {
//   const user = await User.findById(request.user);
//   await Note.deleteMany({ user });
//   await User.findByIdAndRemove(request.user);
//   response.status(204).end();
// });

module.exports = usersRouter;
