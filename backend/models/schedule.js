const mongoose = require('mongoose');
const { userSchema } = require('./User');

const scheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  available: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  taken: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

scheduleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // returnedObject.classes.forEach((c) => {
    //   c.id = c._id.toString();
    //   delete c._id;
    // });
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Schedule', scheduleSchema);
