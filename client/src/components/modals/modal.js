import React from 'react';
import './modal.css';

export default (props) => {
  return( 
  <div className="modal-wrapper">
    <div className="content">
      {props.children}
    </div>
  </div>
  );
};
