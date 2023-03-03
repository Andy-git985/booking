// TODOS: handle request.user error handling

const appointmentRouter = require('express').Router();
const Appointment = require('../models/Appointment');
const Schedule = require('../models/Schedule');
const User = require('../models/User');

appointmentRouter.get('/', async (request, response) => {
  console.log('user', request.user);
  const appointments = await Appointment.find({
    $or: [{ client: request.user }, { employee: request.user }],
  }).populate('client employee');
  console.log({ appointments });
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

// TODO: handle individual role deletion
appointmentRouter.delete('/:id', async (request, response) => {
  const { time } = request.body;
  const { employee } = await Appointment.findById(request.params.id);
  const scheduleToUpdate = await Schedule.findOne({ time: time });
  const index = scheduleToUpdate.appointments.findIndex(
    (appt) => appt._id.toString() === request.params.id
  );
  scheduleToUpdate.appointments.splice(index, 1);
  scheduleToUpdate.available.push(employee);
  await scheduleToUpdate.save();
  await Appointment.findByIdAndDelete(request.params.id);
  response
    .status(200)
    .json({
      success: true,
      message: 'Appointment successfully cancelled',
      data: { id: request.params.id },
    });
});

module.exports = appointmentRouter;
