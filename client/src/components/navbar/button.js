import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({ title,  width, offset, to, height = '50' }) => {
	
	return(
		<NavLink to={to}>
      <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg">
        <rect className="shape" height={height} width={width} strokeDashoffset={offset}/>
      </svg>
      <span>{title}</span>
  	</NavLink>
  )
}