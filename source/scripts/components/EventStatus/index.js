import React from 'react';

export default function EventStatus(props) {
	const classes = ['event-status'];
	if (props.userSelection) {
		classes.push('event-status_user-selection');
	}
	return (
		<div className={classes.join(' ')}>
			<div className={'event-status__name'}>{props.name}</div>
			<div className={'event-status__subtitle'}>{props.subtitle}</div>
		</div>
	);
}

