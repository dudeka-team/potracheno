import React from 'react';
import UniversalListItem from '../../components/UniversalListItem';
import EventActionListItem from '../../components/EventActionListItem';

export default function EventActions(props) {
	return (
		<div>
			{props.actions.map((item) => {
				return (
					<EventActionListItem icon={item.config.icon} text={item.config.text}/>
				);
			})}
		</div>
	);
}

