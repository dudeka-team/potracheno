import React from 'react';
import EventActionListItem from '../../components/EventActionListItem';

const firstAction = {
	config: {
		icon: 'calendar',
		text: 'создано мероприятие',
	},
};

export default function EventActions(props) {
	return (
		<div>
			{[firstAction].concat(props.actions).reverse().map((item) => {
				return (
					<EventActionListItem
						icon={item.config.icon}
						text={item.config.text}
						date={moment(item.config.date).fromNow()}
					/>
				);
			})}
		</div>
	);
}
