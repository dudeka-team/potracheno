import React from 'react';
import EventActionListItem from '../../components/EventActionListItem';

export default function EventActions(props) {
	return (
		<div>
			<EventActionListItem icon="calendar" text="создал мероприятие" />
			{props.actions.map((item) => {
				return (
					<EventActionListItem
						icon={item.config.icon}
						text={item.config.text}
						date={item.config.date}
					/>
				);
			})}
		</div>
	);
}

