import React from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import EventPage from './EventPage';
import setLocalEvents from '../actions/setLocalEvents';
import {TopBar, TopBarIcon, TopBarHeading} from '../components/TopBar';

const UserSelectionPage = React.createClass({

	getInitialState() {
	    return {};
	},

	changeEventName(name) {
		this.setState({
			currentName: name,
		})
	},

	applyEventName() {
		this.props.dispatch(
			setLocalEvents(
				this.props.params.id, 
				this.state.currentName
			)
		);
	},

	render() {
		const {props, state} = this;
		const {currentEvent, isFetchingEvent, localEvents} = props;
		
		return (
			<div>
				<TopBar>
					<TopBarHeading title="" />
					<TopBarIcon icon="info" />
				</TopBar>
				<ul>
					{currentEvent &&
						currentEvent.participants.map(participant => {
							return (
								<li 
									key={participant}
									onClick={() => this.changeEventName(participant)}
								>
									{participant}
								</li>
							);
						})
					}
				</ul>
				{currentEvent && 
					<input type="button" value="Выбрать" onClick={this.applyEventName} />
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

export default connect(mapStateToProps)(withRouter(UserSelectionPage));
