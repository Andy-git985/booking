import { useSelector } from 'react-redux';

const Profile = () => {
  const { userDetails } = useSelector(({ user }) => user);
  return <div>{userDetails.email}</div>;
};

export default Profile;
