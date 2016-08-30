import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import EventsListItem from '../components/EventsListItem';
import {readEventsAsync} from '../actions';

import CircularProgress from 'material-ui/CircularProgress';


function goToNewEventPage() {
	hashHistory.push('/events/new');
}

const EventsPage = React.createClass({
	componentDidMount() {
		const {state, props} = this;
		props.dispatch(readEventsAsync());
	},

	render() {
		const {state, props} = this;
		let eventsListMarkup = null;
		if (props.isDataLoaded) {
			eventsListMarkup = props.events.map(eventId => {
				return (
					<EventsListItem
						key={eventId}
						title={props.eventsById[eventId].name}
						membersCount={props.eventsById[eventId].participants.length}
						date={props.eventsById[eventId].start}
						sum={props.eventsById[eventId].sum || 0}
						debtType="positive"
					/>
				);
			});
		}

		return (
			<div>
				<TopBar>
					<TopBarIcon icon="burger" />
					<TopBarHeading title="Мероприятия" />
					<TopBarIcon icon="plus" onClick={goToNewEventPage} />
				</TopBar>
				{props.isDataLoaded ? 
					<div>{eventsListMarkup}</div> :
					<CircularProgress size={0.3} /> 
				}
			</div>
		);
	},
});

const mapStateToProps = (state) => {
	return {
		events: state.app.events,
		eventsById: state.app.eventsById,
		isDataLoaded: state.app.isDataLoaded,
	}
}

export default connect(mapStateToProps)(EventsPage);
