import { useSelector } from 'react-redux';
import { Outlet, NavLink } from 'react-router-dom';
import Login from '../pages/Login';

const ProtectedRoute = () => {
  const { userDetails } = useSelector(({ user }) => user);
  if (!userDetails) {
    return <Login />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
