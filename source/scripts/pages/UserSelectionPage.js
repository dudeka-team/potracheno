import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import UserSelection from '../components/UserSelection';

const UserSelectionPage = React.createClass({
	render() {
		return (
			<div>
				<UserSelection id={this.props.id} />
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

export default connect(mapStateToProps)(withRouter(UserSelectionPage));
