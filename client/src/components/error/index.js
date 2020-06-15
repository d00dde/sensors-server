import React from 'react';
import { useSelector } from 'react-redux';
import './error.scss';

export default () => {
  const errorMsg = useSelector(({ error }) => error);
  return <div className="error">{errorMsg}</div>;
};
