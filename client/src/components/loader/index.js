import React from 'react';
import './loader.css';

export default ({ size = '200px' }) => {
  const style = {width: size, height: size,};
  return (
    <div className="loader">
      <div className="lds-ring" style={style}>
        <div style={style}></div>
        <div style={style}></div>
        <div style={style}></div>
        <div style={style}></div>
      </div>
    </div>
  );
}