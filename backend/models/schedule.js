const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  classes: [{ time: String, slots: Number }],
});

scheduleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Schedule', scheduleSchema);
