import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import UserSelectionPage from './UserSelectionPage';
import EventPage from './EventPage';
import fetchEventData from '../actions/fetchEventData';

import getLocalEvents from '../actions/getLocalEvents';

const EventPreloadingPage = React.createClass({

	componentWillMount() {
		const {params, dispatch} = this.props;
		dispatch(fetchEventData(params.id));
		dispatch(getLocalEvents());
	},

	render() {
		const {props} = this;
		const {id} = props.params;
		return (
			<div>
				{
					props.localEvents[id] ?
						<EventPage id={id} />
						:
						<UserSelectionPage id={id} />
				}
			</div>
		);
	},
});

function mapStateToProps({events}) {
	return {
		currentEvent: events.currentEvent,
		isFetchingEvent: events.isFetchingEvent,
		localEvents: events.localEvents,
	};
}

export default connect(mapStateToProps)(withRouter(EventPreloadingPage));
