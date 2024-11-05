import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from './images/logo.png';
import vectorIcon from './images/Vector 4.png';
import exitIcon from './images/exit 1.png';
import styles from './Header.module.css';
import { logout } from '../../redux/operations/authOperations';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector(state => state.auth.user);

  const handleLogout = async () => {
    try {
      await dispatch(logout()); // apelăm logoutUser din authSlice pentru deconectare
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      setError('Eroare la deconectare. Încercați din nou.');
    } finally {
      setShowModal(false);
    }
  };

  const handleExitClick = () => {
    setShowModal(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <img src={logo} alt="Company Logo" />
      </div>
      <div className={styles.headerContent}>
        <span className={styles.userName}>
          {user && user.email ? user.email.split('@')[0] : 'Name'}
        </span>
        <img src={vectorIcon} alt="vector" />
        <img src={exitIcon} alt="exit" />
        <button className={styles.exitButton} onClick={handleExitClick}>
          Exit
        </button>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout}>Log out</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {error && (
        <div className={styles.errorNotification}>
          <p>{error}</p>
          <button onClick={() => setError(null)}>Close</button>
        </div>
      )}
    </header>
  );
};

export default Header;
