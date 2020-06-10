import React from 'react';
import RegisterModal from './register-modal';
import LoginModal from './login-modal';

export default ({ showModal }) => {
  switch (showModal) {
    case 'register':
      return <RegisterModal />;
    case 'login':
      return <LoginModal />;
    default:
      return null;
  }
};
