import React from 'react';

export default function EventStatus(props) {
	return (
		<div className="event-status">
			<div className="event-status__title">{props.name}</div>
			<div className="event-status__subtitle">{props.subtitle}</div>
		</div>
	);
}

