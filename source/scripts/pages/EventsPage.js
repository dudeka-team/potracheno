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
				{props.events.length ?
					<div>
						{
							props.events
								.slice()
								.reverse()
								.map(eventId => ({
									eventId,
									event: props.eventsById[eventId],
								}))
								.map(({event, eventId}) => {
									return (
										<Link to={`events/${eventId}`} key={eventId}>
											<EventsListItem
												title={event.name}
												membersCount={event.participants.length}
												date={event.start}
												sum={event.sum || 0}
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

export default connect(mapStateToProps)(withRouter(EventsPage));
