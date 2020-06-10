import React from 'react';
import Modal from './modal';
import { useDispatch, useSelector } from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  const language = useSelector(({ language }) => language.register);
  return (
    <Modal>
      <input placeholder="email" />
      <input placeholder="password" />
      <input placeholder="password" />
      <button>{language.regButton}</button>
    </Modal>
  );
};
