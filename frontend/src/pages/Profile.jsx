import { useSelector } from 'react-redux';
import dateServices from '../services/date';

const Profile = () => {
  const { userDetails } = useSelector(({ user }) => user);
  console.log(userDetails);
  const appointments = userDetails.appointments;
  return (
    <>
      <div>profile</div>
      <div>
        {appointments.map((appt) => {
          return (
            <>
              <div>{dateServices.formatToDate(appt.date)}</div>
              <div>{dateServices.formatToTime(appt.time)}</div>
              <div>{appt.client}</div>
              <div>{appt.employee}</div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
