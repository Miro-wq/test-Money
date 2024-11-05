import React from 'react';
import LoginFormModal from '../../components/LoginForm/LoginForm';

const LoginPage = () => {
  const handleModalClose = () => {
    console.log('Modal closed');
  };

  return (
    <div>
      <LoginFormModal onClose={handleModalClose} />
    </div>
  );
};

export default LoginPage;
