const appointmentRouter = require('express').Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');

appointmentRouter.get('/', async (request, response) => {
  const appointments = await Appointment.find({
    $or: [{ client: request.user }, { employee: request.user }],
  }).populate('client employee');
  console.log(appointments);
  response.status(200).json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  const { date, time, employee } = request.body;
  const clientToBook = await User.findOne({ _id: request.user });
  const employeeToBook = await User.findOne({ _id: employee });
  const newAppt = new Appointment({
    date,
    time,
    client: clientToBook,
    employee: employeeToBook,
  });
  await newAppt.save();
  // clientToBook.appointments.push(newAppt._id);
  // employeeToBook.appointments.push(newAppt._id);
  // await clientToBook.save();
  // await employeeToBook.save();
  response.status(201).json({
    success: true,
    message: 'Appointment successfully reserved',
    data: newAppt,
  });
});

module.exports = appointmentRouter;
