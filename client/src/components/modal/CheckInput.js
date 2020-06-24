import React from 'react';

export default ({ 
	label, 
	ph, 
	channel,
	address, 
	enabled,
	changeHandler, 
}) => {
	return(
		<div className='input-wrapper'>
			<input 
				type='checkbox'
				onChange={(e) => changeHandler('enabled', channel, e.target.checked)}
				checked={enabled}
			/>
			<input className='check'
				type='text' 
				placeholder={ph}
				value={address}
				onChange={(e) => changeHandler('address', channel, e.target.value.trim())}
				disabled={!enabled}
			/>
			<div className='label'>{label}</div>
		</div>
	);
}