import React from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import Wrapper from '../components/Wrapper';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import EventsListItem from '../components/EventsListItem';
import {readEvents} from '../actions';
import FlexContainer from '../components/FlexContainer';
import changeCurrentEvent from '../actions/changeCurrentEvent';
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
		const {props, state} = this;
		return (
			<div>
				{	
					(props.localEvents[props.params.id]
						&& <EventPage params={{id: props.params.id}} />)
							|| <UserSelectionPage params={{id: props.params.id}}  />
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
