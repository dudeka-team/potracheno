import React from 'react';
import withRouter from 'react-router/lib/withRouter';
import { connect } from 'react-redux';

import Wrapper from '../components/Wrapper';
import EventPage from './EventPage';
import UserSelection from '../components/UserSelection';

import fetchEventData from '../actions/fetchEventData';
import getLocalEvents from '../actions/getLocalEvents';

import db from '../database';

import {
	getUserType,
	setUserType,
	INVITED,
} from '../modules/metrics';


const EventPreloadingPage = React.createClass({
	componentDidMount() {
		const { params, dispatch } = this.props;
		dispatch(fetchEventData(params.id));
		dispatch(getLocalEvents());

		const localEvents = db.getLocalEvents();
		const localEventsCount = Object.keys(localEvents).length;
		const userType = getUserType();

		if (localEventsCount === 0 && !userType) {
			setUserType(INVITED);
		}
	},

	render() {
		const { props } = this;
		const { id } = props.params;
		return (
			<Wrapper>
				{
					props.localEvents[id] ?
						<EventPage id={id} />
						:
						<UserSelection id={id} />
				}
			</Wrapper>
		);
	},
});

function mapStateToProps({ events }) {
	return {
		currentEvent: events.currentEvent,
		isFetchingEvent: events.isFetchingEvent,
		localEvents: events.localEvents,
	};
}

export default connect(mapStateToProps)(withRouter(EventPreloadingPage));
