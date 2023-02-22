const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  passwordHash: {
    type: String,
  },
  role: {
    type: String,
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
