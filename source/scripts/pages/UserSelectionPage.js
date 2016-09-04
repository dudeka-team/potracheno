import React from 'react';
import {withRouter, Link} from 'react-router';
import {connect} from 'react-redux';
import EventPage from './EventPage';

const UserSelectionPage = React.createClass({

	getInitialState() {
	    return {
	    	nameChanged: false,
	    };
	},

	changeEventName(name) {
		this.setState({
			currentName: name,
		})
	},

	applyEventName() {
		this.setState({
			nameChanged: true,
		})

		const currentLocalState = JSON.parse(localStorage.getItem('localEvents') || "{}");
		const newLocalEventToSave = {};
		newLocalEventToSave[this.props.params.id] = this.state.currentName;
		
		localStorage
				.setItem('localEvents', 
					JSON.stringify(Object.assign(currentLocalState, newLocalEventToSave))
				);
	},

	render() {
		const {props, state} = this;
		const {currentEvent, isFetchingEvent, localEvents} = props;
		return (
			<div>
				{
					(!state.nameChanged && !localEvents[props.params.id] &&
						<div>
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
							{currentEvent && <input type="button" value="Выбрать" onClick={this.applyEventName} />}
						</div>)
						|| <EventPage params={{id: this.props.params.id}} eventName={state.currentName} />
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
