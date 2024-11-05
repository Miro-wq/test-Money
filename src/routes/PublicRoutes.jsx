// PublicRoutes.jsx
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoutes = ({ isAuthenticated }) => {
  // Redirect to dashboard if user is already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return <Outlet />;
};

PublicRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PublicRoutes;
