import React from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import EventsListItem from '../components/EventsListItem';
import {readEvents} from '../actions';
import FlexContainer from '../components/FlexContainer';


const EventsPage = React.createClass({
	componentDidMount() {
		const {props} = this;
		props.dispatch(readEvents());
	},

	goToNewEvent() {
		this.props.router.push('/events/new');
	},

	render() {
		const {props} = this;
		return (
			<div>
				<TopBar>
					<TopBarIcon icon="burger" />
					<TopBarHeading title="Мероприятия" />
					<TopBarIcon icon="plus" onClick={this.goToNewEvent} />
				</TopBar>
				{props.isReadingEvents ?
					<FlexContainer alignItems="center" justifyContent="center">
						<CircularProgress size={0.4} />
					</FlexContainer>
					:
					props.events
						.reverse()
						.map(getEventData(props.eventsById))
						.map(renderEventPreview)
				}
			</div>
		);
	},
});

function getEventData(eventsById) {
	return (eventId) => ({
		eventId,
		data: eventsById[eventId],
	});
}

function renderEventPreview(eventData) {
	const {eventId, data} = eventData;

	return (
		<Link to={`events/${eventId}`} key={eventId}>
			<EventsListItem
				title={data.name}
				membersCount={data.participants.length}
				date={data.start}
				sum={data.sum || 0}
				debtType="positive"
			/>
		</Link>
	);
}

const mapStateToProps = ({events}) => {
	return {
		events: events.events,
		eventsById: events.eventsById,
		isReadingEvents: events.isReadingEvents,
	};
};

export default connect(mapStateToProps)(withRouter(EventsPage));
