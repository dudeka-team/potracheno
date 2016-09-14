import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import EventActionListItem from '../../components/EventActionListItem';

function EventActions(props) {
	const firstAction = {
		config: {
			text: `b_${props.currentEvent.manager}_s_создал_s_мероприятие`,
			icon: 'calendar',
		},
	};
	return (
		<div>
			{[firstAction, ...props.actions].reverse().map((item, i) => {
				return (
					<EventActionListItem
						key={i}
						icon={item.config.icon}
						text={item.config.text}
						date={item.config.date}
						purchasePrice={item.config.purchasePrice}
					/>
				);
			})}
		</div>
	);
}

function mapStateToProps({events}) {
	return {
		currentEvent: events.currentEvent,
	};
}

export default withRouter(connect(mapStateToProps)(EventActions));
