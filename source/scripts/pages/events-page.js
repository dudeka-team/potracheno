import React, { PureComponent } from 'react';
import withRouter from 'react-router/lib/withRouter';
import { connect } from 'react-redux';

import Page from '../components/page';
import { TopBar, TopBarHeading, TopBarIcon } from '../components/top-bar';
import EventsListItem from '../components/events-list-item';
import ActionButton from '../components/action-button';
import readEvents from '../actions/readEvents';
import FlexContainer from '../components/flex-container';
import Poster from '../components/poster';
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
					<Poster icon="calendar">
						У вас пока нет мероприятий, создайте первым свое мероприятие и добавьте участников
					</Poster>
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
			<Page>
				<Page.Header>
					<TopBar bordered>
						<TopBarHeading title="Мероприятия" />
						<TopBarIcon icon="mail" onClick={this.goToFeedback} />
					</TopBar>
				</Page.Header>

				<Page.Content>
					{props.isFetchingEvents ?
						this.renderPreloader()
						:
						this.renderEvents(props.events, props.eventsById)
					}
				</Page.Content>

				<Page.Footer>
					<ActionButton onClick={this.goToNewEvent}>
						Добавить мероприятие
					</ActionButton>
				</Page.Footer>
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
