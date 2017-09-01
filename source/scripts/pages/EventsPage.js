import React, { PureComponent } from 'react';
import withRouter from 'react-router/lib/withRouter';
import { connect } from 'react-redux';

import { Page, PageContent } from '../components/Page';
import { TopBar, TopBarHeading, TopBarIcon } from '../components/TopBar';
import EventsListItem from '../components/EventsListItem';
import ActionButton from '../components/ActionButton';
import readEvents from '../actions/readEvents';
import FlexContainer from '../components/FlexContainer';
import Poster from '../components/Poster';
import Spinner from '../components/spinner';
import changeCurrentEvent from '../actions/changeCurrentEvent';
import { getEventBalance } from '../modules/balance';
import getLocalEvents from '../actions/getLocalEvents';

class EventsPage extends PureComponent {
	state = {
		balance: {},
	};

	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(getLocalEvents());
		dispatch(readEvents());
	}

	goToNewEvent = () => {
		this.props.router.push('/events/new');
	}

	goToFeedback = () => {
		this.props.router.push('/feedback');
	}

	goToEvent = (eventId) => {
		this.props.dispatch(changeCurrentEvent(eventId));
		this.props.router.push(`events/${eventId}`);
	}

	renderEventPreview = (eventData) => {
		const { eventId, data } = eventData;
		const { start, end } = data;
		const currentBalance =
			getEventBalance(data)[this.props.localEvents[eventId]];

		return (
			<div onClick={() => this.goToEvent(eventId)} key={eventId}>
				<EventsListItem
					title={data.name}
					membersCount={data.participants.length}
					datePeriod={{ start, end }}
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
	}

	renderEvents = (events, eventsById) => {
		if (!events.length) {
			return (
				<FlexContainer alignItems="center" justifyContent="center" fullHeight>
					<Poster
						icon="calendar"
						text="У вас пока нет мероприятий, создайте первым свое мероприятие и добавьте участников"
					/>
				</FlexContainer>
			);
		}

		return [...events]
			.reverse()
			.map(getEventData(eventsById))
			.map(this.renderEventPreview);
	}

	renderPreloader = () => (
		<FlexContainer fullHeight alignItems="center" justifyContent="center">
			<Spinner />
		</FlexContainer>
	)

	render() {
		const { props } = this;

		return (
			<Page style={{ paddingBottom: '64px' }}>
				<TopBar bordered>
					<TopBarHeading title="Мероприятия" />
					<TopBarIcon icon="mail" onClick={this.goToFeedback} />
				</TopBar>
				<PageContent>
					{props.isFetchingEvents ?
						this.renderPreloader()
						:
						this.renderEvents(props.events, props.eventsById)
					}
					<ActionButton text="Добавить мероприятие" onClick={this.goToNewEvent} />
				</PageContent>
			</Page>
		);
	}
}

function getEventData(eventsById) {
	return (eventId) => ({
		eventId,
		data: eventsById[eventId],
	});
}

const mapStateToProps = ({ events }) => ({
	isFetchingEvents: events.isFetchingEvents,
	events: events.events,
	eventsById: events.eventsById,
	localEvents: events.localEvents,
});

export default connect(mapStateToProps)(withRouter(EventsPage));
