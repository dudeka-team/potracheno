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

const EventPreloadingPage = React.createClass({
	getInitialState() {
		const localEventsId = localStorage.getItem('localEvents');
		if (localEventsId !== null) {
			if (localEventsId.indexOf(this.props.params.id) !== -1) {
				return {
	    			isLocal: true,
	    		}
			}
		}
		return {
			isLocal: false,
		}
	},

	render() {
		return (
			<div>
				{
					(this.state.isLocal
						&& <EventPage params={{id: this.props.params.id}}/>)
							|| <UserSelectionPage id={this.props.params.id} />
				}
			</div>
		);
	},
});

export default connect()(withRouter(EventPreloadingPage));
