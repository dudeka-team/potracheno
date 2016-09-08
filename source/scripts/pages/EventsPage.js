import React from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import {Page, PageContent} from '../components/Page';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import EventsListItem from '../components/EventsListItem';
import {readEvents} from '../actions';
import FlexContainer from '../components/FlexContainer';
import changeCurrentEvent from '../actions/changeCurrentEvent';
import {getEventBalance} from '../modules/balance';
import getLocalEvents from '../actions/getLocalEvents';


const EventsPage = React.createClass({
	getInitialState() {
		return {
			balance: {},
		};
	},

	componentDidMount() {
		const {props} = this;
		props.dispatch(getLocalEvents());
		props.dispatch(readEvents(props.localEvents));
	},

	goToNewEvent() {
		this.props.router.push('/events/new');
	},

	goToEvent(eventId) {
		this.props.dispatch(changeCurrentEvent(eventId));
		this.props.router.push(`events/${eventId}`);
	},

	renderEventPreview(eventData) {
		const {eventId, data} = eventData;
		return (
			<div onClick={() => this.goToEvent(eventId)} key={eventId}>
				<EventsListItem
					title={data.name}
					membersCount={data.participants.length}
					date={data.start}
					sum={Math.round(getEventBalance(data)[this.props.localEvents[eventId]] || 0)}
					debtType={
						((getEventBalance(data)[this.props.localEvents[eventId]] > 0) && 'positive')
						||
						((getEventBalance(data)[this.props.localEvents[eventId]] < 0) && 'negative')
						||
						(!getEventBalance(data)[this.props.localEvents[eventId]] && 'neutural')
					}
				/>
			</div>
		);
	},

	renderEvents(events, eventsById) {
		let result = events
			.slice()
			.reverse()
			.map(getEventData(eventsById))
			.map(this.renderEventPreview);

		if (!result.length) {
			result = (
				<FlexContainer alignItems="center" justifyContent="center">
					<p>Мероприятий нет. <Link to="/events/new">Создайте первое!</Link></p>
				</FlexContainer>
			);
		}

		return result;
	},

	render() {
		const {props} = this;
		return (
			<Page>
				<TopBar>
					<TopBarIcon icon="burger" />
					<TopBarHeading title="Мероприятия" />
					<TopBarIcon icon="plus" onClick={this.goToNewEvent} />
				</TopBar>
				<PageContent>
					{props.eventsLoaded ?
						this.renderEvents(props.events, props.eventsById)
						:
						<FlexContainer alignItems="center" justifyContent="center">
							<CircularProgress />
						</FlexContainer>
					}
				</PageContent>
			</Page>
		);
	},
});

function getEventData(eventsById) {
	return (eventId) => ({
		eventId,
		data: eventsById[eventId],
	});
}

const mapStateToProps = ({events}) => {
	return {
		eventsLoaded: events.loaded,
		events: events.events,
		eventsById: events.eventsById,
		localEvents: events.localEvents,
	};
};

export default connect(mapStateToProps)(withRouter(EventsPage));
