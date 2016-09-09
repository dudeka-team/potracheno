import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import setLocalEvents from '../actions/setLocalEvents';

import FlexContainer from '../components/FlexContainer';
import {TopBar, TopBarIcon, TopBarHeading} from '../components/TopBar';

const UserSelectionPage = React.createClass({
	changeEventName(name) {
		this.setState({
			currentName: name,
		});
	},

	applyEventName() {
		this.props.dispatch(
			setLocalEvents(
				this.props.id,
				this.state.currentName
			)
		);
	},

	renderPreloader() {
		return (
			<FlexContainer alignItems="center" justifyContent="center">
				<CircularProgress />
			</FlexContainer>
		);
	},

	render() {
		const {props} = this;
		const {currentEvent} = props;

		if (!currentEvent) {
			return this.renderPreloader();
		}

		return (
			<div>
				<TopBar>
					<TopBarHeading title="" />
					<TopBarIcon icon="info" />
				</TopBar>
				<ul>
					{currentEvent.participants.map(participant => {
						return (
							<li
								key={participant}
								onClick={() => this.changeEventName(participant)}
							>
								{participant}
							</li>
						);
					})}
				</ul>
				<input type="button" value="Выбрать" onClick={this.applyEventName} />
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
