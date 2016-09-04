import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import createEvent from '../../actions/createEvent';
import {createEventActionAsync, eventActionTypes} from '../../actions/createEventAction';


const NewEvent = React.createClass({
	getInitialState() {
		const now = new Date();
		return {
			name: '',
			start: now,
			end: now,
			participants: [''],
			currentStep: 1,
		};
	},

	goToEvents() {
		this.props.router.push('/events');
	},

	goToFirstStep() {
		this.setState({
			currentStep: 1,
		});
	},

	goToSecondStep() {
		if (this.state.name.trim()) {
			this.setState({
				currentStep: 2,
			});
		}
	},

	save() {
		const {props, state} = this;

		props.dispatch(createEvent({
			name: state.name,
			start: state.start.valueOf(),
			end: state.end.valueOf(),
			participants: state.participants.filter(Boolean),
		}));

		props.dispatch(createEventActionAsync({
			eventId: props.params.id,
			eventActionInfo: {
				text: eventActionTypes.eventCreation(state.name),
			},
		}));
	},

	handleEventNameChange(event) {
		this.setState({
			name: event.target.value,
		});
	},

	handleStartDateChange(event, date) {
		const {state} = this;
		this.setState({
			start: date,
			end: date > state.end ? date : state.end,
		});
	},

	handleEndDateChange(event, date) {
		this.setState({
			end: date,
		});
	},

	handleParticipantChange(index, name) {
		const {state} = this;
		const updatedParticipants = [
			...state.participants.slice(0, index),
			name,
			...state.participants.slice(index + 1),
		];

		keepOneEmptyItem(updatedParticipants);

		this.setState({
			participants: updatedParticipants,
		});
	},

	handleParticipantInputBlur() {
		const filteredParticipants = this.state.participants.filter(Boolean);
		keepOneEmptyItem(filteredParticipants);

		this.setState({
			participants: filteredParticipants,
		});
	},

	render() {
		const {state} = this;
		return (
			<div>
				{state.currentStep === 1 && <FirstStep
					eventName={state.name}
					start={state.start}
					end={state.end}
					secondStepAvailable={!!state.name.trim()}
					onBack={this.goToEvents}
					onForward={this.goToSecondStep}
					handleEventNameChange={this.handleEventNameChange}
					handleStartDateChange={this.handleStartDateChange}
					handleEndDateChange={this.handleEndDateChange}
				/>}
				{state.currentStep === 2 && <SecondStep
					participants={state.participants}
					saveAvailable={!!state.participants.filter(Boolean).length}
					save={this.save}
					goToFirstStep={this.goToFirstStep}
					handleParticipantChange={this.handleParticipantChange}
					handleParticipantInputBlur={this.handleParticipantInputBlur}
				/>}
			</div>
		);
	},
});

function keepOneEmptyItem(participants) {
	if (participants.filter((i) => !i).length === 0) {
		participants.push('');
	}

	return participants;
}

export default connect()(withRouter(NewEvent));
