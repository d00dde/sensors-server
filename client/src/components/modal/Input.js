import React from 'react';

export default ({ type, label, ph, name, onChange, defVal = '' }) => {
	if(type !== 'password')
		type = 'text';
	return(
		<div className='input-wrapper'>
			<input 
				type={type} 
				placeholder={ph}
				name={name} 
				onChange={onChange}
				defaultValue={defVal}
			/>
			<div className='label'>{label}</div>
		</div>
	);
}