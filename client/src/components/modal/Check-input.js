import React from 'react';

export default ({ 
	label, 
	ph, 
	channel,
	value, 
	enabled,
	changeHandler, 
}) => {
	return(
		<div className='input-wrapper'>
			<input 
				type='checkbox'
				onChange={(e) => changeHandler('enabled', channel, e.target.checked)}
			/>
			<input className='check'
				type='text' 
				placeholder={ph}
				value={value}
				onChange={(e) => changeHandler('value', channel, e.target.value.trim())}
				disabled={!enabled}
			/>
			<div className='label'>{label}</div>
		</div>
	);
}