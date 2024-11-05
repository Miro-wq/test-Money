import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from 'Pages/LoginPage/LoginPage';
import RegisterPage from 'Pages/RegisterPage/RegisterPage';
import DashboardPage from 'Pages/DashboardPage/DashboardPage';
import Home from 'Pages/Home/Home';
import Statistics from 'Pages/Statistics/Statistics';
import CurrencyTab from 'Pages/CurrencyTab/CurrencyTab';
import PrivateRoutes from '../../routes/PrivateRoutes';
import PublicRoutes from '../../routes/PublicRoutes';
import Loader from 'components/Loader/Loader';
import { user } from '../../redux/selectors/authSelectors';
import { useMediaQuery } from 'react-responsive';

const App = () => {
  const isAuthenticated = Boolean(useSelector(user));
  const isOnMobile = useMediaQuery({ query: '(max-width: 768px)' });
  // const isLoading = useSelector(auth.loading);

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="statistics" element={<Statistics />} />
              {isOnMobile && (
                <Route path="currency" element={<CurrencyTab />} />
              )}
            </Route>
          </Route>

          {/* Catch-all redirect */}
          <Route
            path="*"
            element={
              <Navigate
                to={isAuthenticated ? '/dashboard' : '/login'}
                replace
              />
            }
          />
        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
