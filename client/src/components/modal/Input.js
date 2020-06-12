import React from 'react';

export default ({ type, label, ph, name, onChange }) => {
	if(type !== 'password')
		type = 'text';
	return(
		<div className='input-wrapper'>
			<input 
				type={type} 
				placeholder={ph}
				name={name} 
				onChange={onChange}
			/>
			<div className='label'>{label}</div>
		</div>
	);
}