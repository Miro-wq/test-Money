import React from 'react';
import RegisterFormModal from '../../components/RegistrationForm/RegistrationForm';

const RegisterPage = () => {
  const handleModalClose = () => {
    console.log('Modal closed');
  };

  return (
    <div>
      <RegisterFormModal onClose={handleModalClose} />
    </div>
  );
};

export default RegisterPage;
