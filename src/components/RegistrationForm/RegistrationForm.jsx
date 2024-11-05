import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../redux/operations/authOperations';
import { clearError } from '../../redux/slices/AuthSlice';
import PasswordStrengthBar from 'react-password-strength-bar';
import { toast } from 'react-toastify';
import styles from './RegistrationForm.module.css';
import logo from './images/logo.svg';
import { auth } from '../../redux/selectors/authSelectors';

const RegisterForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(auth);

  const togglePasswordVisibility = () => setIsPasswordVisible(prev => !prev);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(prev => !prev);

  const validateForm = () => {
    const errors = {};
    
    if (!registerData.name.trim()) {
      errors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (registerData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    } else if (registerData.password.length > 12) {
      errors.password = 'Password must not exceed 12 characters';
    }

    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setRegisterData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Remove resultAction since we're not using it
      await dispatch(register(registerData)).unwrap();
      toast.success('Registration successful! Redirecting to dashboard...');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.');
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, dispatch, navigate]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <img src={logo} alt="Logo" className={styles.logo} />

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <i className="fas fa-user" aria-label="User icon"></i>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={registerData.name}
              onChange={handleChange}
              required
            />
            {formErrors.name && (
              <span className={styles.fieldError}>{formErrors.name}</span>
            )}
          </div>

          <div className={styles.inputField}>
            <i className="fas fa-envelope" aria-label="Email icon"></i>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={registerData.email}
              onChange={handleChange}
              required
            />
            {formErrors.email && (
              <span className={styles.fieldError}>{formErrors.email}</span>
            )}
          </div>

          <div className={styles.inputField}>
            <i className="fas fa-lock" aria-label="Password icon"></i>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleChange}
              required
            />
            <i
              className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer', marginLeft: '8px' }}
              aria-label="Toggle password visibility"
            ></i>
            {formErrors.password && (
              <span className={styles.fieldError}>{formErrors.password}</span>
            )}
            <div className={styles.strengthBarContainer}>
              <PasswordStrengthBar password={registerData.password} />
            </div>
          </div>

          <div className={styles.inputField}>
            <i className="fas fa-lock" aria-label="Confirm password icon"></i>
            <input
              type={isConfirmPasswordVisible ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={handleChange}
              required
            />
            <i
              className={`fas ${isConfirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={toggleConfirmPasswordVisibility}
              style={{ cursor: 'pointer', marginLeft: '8px' }}
              aria-label="Toggle confirm password visibility"
            ></i>
            {formErrors.confirmPassword && (
              <span className={styles.fieldError}>{formErrors.confirmPassword}</span>
            )}
            <div className={styles.strengthBarContainer}>
              <PasswordStrengthBar password={registerData.confirmPassword} />
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={styles.registerButton}
          >
            REGISTER
          </button>

          <Link to="/login" className={styles.loginButton}>
            LOG IN
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;