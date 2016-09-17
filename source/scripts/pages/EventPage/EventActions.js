import React from 'react';
import {connect} from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import EventActionListItem from '../../components/EventActionListItem';

const EventActions = React.createClass({
	render() {
		const firstAction = {
			config: {
				manager: this.props.currentEvent.manager,
				icon: 'calendar',
				actionType: 'createEvent',
			},
		};
		return (
			<div>
				{[firstAction, ...this.props.actions].reverse().map((item, i) => {
					return (
						<EventActionListItem
							key={i}
							icon={item.config.icon}
							text={item.config.text}
							date={item.config.date}
							sum={item.config.sum}
							debtSum={item.config.debtSum}
							actionType={item.config.actionType}
							purchaseName={item.config.purchaseName}
							currentUser={item.config.currentUser}
							payerName={item.config.payerName}
							participantName={item.config.participantName}
							eventName={item.config.eventName}
							start={item.config.start}
							end={item.config.end}
							manager={this.props.currentEvent.manager}
						/>
					);
				})}
			</div>
		);
	},
});

function mapStateToProps({events}) {
	return {
		currentEvent: events.currentEvent,
	};
}

export default withRouter(connect(mapStateToProps)(EventActions));
