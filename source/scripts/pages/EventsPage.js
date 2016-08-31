import React from 'react';
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import EventsListItem from '../components/EventsListItem';
import {readEventsAsync} from '../actions';
import FlexContainer from '../components/FlexContainer';

function goToNewEventPage() {
	hashHistory.push('/events/new');
}

const EventsPage = React.createClass({
	componentDidMount() {
		const {props} = this;
		props.dispatch(readEventsAsync());
	},

	render() {
		const {props} = this;
		return (
			<div>
				<TopBar>
					<TopBarIcon icon="burger" />
					<TopBarHeading title="Мероприятия" />
					<TopBarIcon icon="plus" onClick={goToNewEventPage} />
				</TopBar>
				{props.events.length ?
					<div>
						{
							props.events.map(eventId => {
								return (
									<Link to={`events/${eventId}`} key={eventId}>
										<EventsListItem
											title={props.eventsById[eventId].name}
											membersCount={props.eventsById[eventId].participants.length}
											date={props.eventsById[eventId].start}
											sum={props.eventsById[eventId].sum || 0}
											debtType="positive"
										/>
									</Link>
								);
							})
						}
					</div> :
					<FlexContainer alignItems="center" justifyContent="center">
						<CircularProgress size={0.4} />
					</FlexContainer>
				}
			</div>
		);
	},
});

const mapStateToProps = (state) => {
	return {
		events: state.app.events,
		eventsById: state.app.eventsById,
	};
};

export default connect(mapStateToProps)(EventsPage);
