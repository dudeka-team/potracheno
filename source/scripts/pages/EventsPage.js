import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import {Page, PageContent} from '../components/Page';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import EventsListItem from '../components/EventsListItem';
import ActionButton from '../components/ActionButton';
import {readEvents} from '../actions';
import FlexContainer from '../components/FlexContainer';
import Poster from '../components/Poster';
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

		const currentBalance =
			getEventBalance(data)[this.props.localEvents[eventId]];

		return (
			<div onClick={() => this.goToEvent(eventId)} key={eventId}>
				<EventsListItem
					title={data.name}
					membersCount={data.participants.length}
					date={data.start}
					sum={Math.round(currentBalance || 0)}
					debtType={
						((currentBalance > 0) && 'positive')
						||
						((currentBalance < 0) && 'negative')
						||
						(!currentBalance && 'neutural')
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
				<FlexContainer alignItems="center" justifyContent="center" fullHeight>
					<Poster
						icon="calendar"
						// eslint-disable-next-line max-len
						text="У вас пока нет мероприятий, создайте первым свое мероприятие и добавьте участников"
					/>
				</FlexContainer>
			);
		}

		return result;
	},

	render() {
		const {props} = this;
		return (
			<Page>
				<TopBar bordered>
					<TopBarHeading title="Мероприятия" />
					<TopBarIcon icon="more-actions" />
				</TopBar>
				<PageContent>
					{props.eventsLoaded ?
						this.renderEvents(props.events, props.eventsById)
						:
						<FlexContainer alignItems="center" justifyContent="center" fullHeight>
							<CircularProgress />
						</FlexContainer>
					}
					<ActionButton text="Добавить мероприятие" onClick={this.goToNewEvent} />
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
