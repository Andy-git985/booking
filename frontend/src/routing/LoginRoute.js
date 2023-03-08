import { useSelector } from 'react-redux';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';

const LoginRoute = () => {
  const navigate = useNavigate();
  const { userDetails } = useSelector(({ user }) => user);
  if (!userDetails) {
    return <Login />;
  }
  return <Outlet />;
};

export default LoginRoute;
