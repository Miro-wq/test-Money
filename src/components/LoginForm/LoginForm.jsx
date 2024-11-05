import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/operations/authOperations';
import { clearError } from '../../redux/slices/AuthSlice';
import { auth } from '../../redux/selectors/authSelectors';
import styles from './LoginForm.module.css';
import iconEmail from './images/icon_Email.svg';
import iconLacat from './images/icon_Lacat.svg';
import iconLinie from './images/icon_Linie.png';
import logo from './images/logo.svg';

const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(auth);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
    return () => dispatch(clearError());
  }, [user, dispatch, navigate]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <img src={logo} alt="Logo" className={styles.logo} />
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <img src={iconEmail} alt="Email Icon" className={styles.inputIcon} />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={loginData.email}
              onChange={handleChange}
              required
            />
            <img src={iconLinie} alt="Line Icon" className={styles.inputLine} />
          </div>

          <div className={styles.inputField}>
            <img src={iconLacat} alt="Lock Icon" className={styles.inputIcon} />
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
            <img src={iconLinie} alt="Line Icon" className={styles.inputLine} />
            <i
              className={`${styles.passwordToggle} fas ${
                isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'
              }`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            <span className={styles.loginButtonText}>LOG IN</span>
          </button>

          <button
            type="button"
            className={styles.registerButton}
            onClick={() => navigate('/register')}
          >
            <span className={styles.registerButtonText}>REGISTER</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;