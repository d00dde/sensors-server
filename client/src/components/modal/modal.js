import React, { useEffect } from 'react';
import './modal.scss';
import Loader from '../loader';
import { useSelector, useDispatch } from 'react-redux';
import { setError } from '../../redux/actions';

export default (props) => {
  const { loading, error } = useSelector(({ loading, error }) => {
    return { loading, error };
  });
  const closeHandler = (e) => {
    if (!e.target.closest('.content')) {
      props.closeModal();
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setError(''));
  }, [dispatch]);

  const msg = loading ? <Loader size="50px" /> : error ? error : props.msg;
  const keyHandler = (e) => {
    if (e.key === 'Enter') props.submit();
  };
  const message = props.noMessage ? null : <div className="message">{msg}</div>;

  return (
    <div
      className="modal-wrapper"
      onClick={closeHandler}
      onKeyPress={keyHandler}
    >
      <div className="content">
        <div className="close" onClick={props.closeModal}>
          &times;
        </div>
        {props.children}
        {message}
      </div>
    </div>
  );
};
