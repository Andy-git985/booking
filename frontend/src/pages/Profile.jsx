import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../features/userSlice';
import dateServices from '../services/date';
import apptServices from '../services/appointment';
import { getUserAppts } from '../features/appointmentSlice';

const Person = ({ role, appt }) => {
  return (
    <>
      {role === 'client' ? (
        <div>{appt.employee.email}</div>
      ) : (
        <div>{appt.client.email}</div>
      )}
    </>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(({ appointment }) => appointment);
  const { userDetails } = useSelector(({ user }) => user);
  const role = userDetails?.role;

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserAppts());
  }, [dispatch]);

  return (
    <>
      <div>profile</div>
      <div>
        {data ? (
          data.map((appt) => {
            return (
              <div key={appt.id}>
                <div>{dateServices.formatToDate(appt.date)}</div>
                <div>{dateServices.formatToTime(appt.time)}</div>
                <Person role={role} appt={appt} />
              </div>
            );
          })
        ) : (
          <div>No appointments made</div>
        )}
      </div>
    </>
  );
};

export default Profile;
