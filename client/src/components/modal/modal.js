import React from 'react';
import './modal.scss';
import Loader from '../loader';
import { useSelector } from 'react-redux';

export default (props) => {
  const loading = useSelector(({ loading }) => loading);
  const closeHandler = (e) => {
  	if(!e.target.closest('.content')){
  		props.closeModal();
  	}
  };

  const msg = loading ? <Loader size='50px'/> : props.msg;
  const keyHandler = (e) => {
    if(e.key === 'Enter')
      props.submit();
  }
  
  return( 
  <div className='modal-wrapper' onClick={closeHandler} onKeyPress={keyHandler}>
    <div className='content'>
    	<div className='close' onClick={props.closeModal}>&times;</div>
      {props.children}
      <div className='message'>{msg}</div>
    </div>
  </div>);
};
