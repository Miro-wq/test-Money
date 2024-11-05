import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoutes = ({ isAuthenticated }) => {
  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

PrivateRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRoutes;