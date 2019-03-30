import { EventsPage as EventsPageView } from './view';
import withRouter from 'react-router/lib/withRouter';
import { connect } from 'react-redux';

const mapStateToProps = ({ events }) => ({
	isFetchingEvents: events.isFetchingEvents,
	events: events.events,
	eventsById: events.eventsById,
	localEvents: events.localEvents,
});

export const EventsPage = connect(mapStateToProps)(withRouter(EventsPageView));
