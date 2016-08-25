import React from 'react';
import {hashHistory} from 'react-router';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';


function goToEvents() {
	hashHistory.push('/events');
}

export default React.createClass({
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

	goToSecondStep() {
		if (this.state.name.trim()) {
			this.setState({
				currentStep: 2,
			});
		}
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
					onBack={goToEvents}
					onForward={this.goToSecondStep}
					onEditEventName={(event) => this.setState({
						name: event.target.value,
					})}
					onSetStartDate={(event, date) => this.setState({
						start: date,
						end: date > state.end ? date : state.end,
					})}
					onSetEndDate={(event, date) => this.setState({
						end: date,
					})}
				/>}
				{state.currentStep === 2 && <SecondStep
					participants={state.participants}
					saveAvailable={!!state.participants.filter(Boolean).length}
					save={() => {
						hashHistory.push('/events');
					}}
					onChangeParticipant={(index, name) => {
						const updatedParticipants = [
							...state.participants.slice(0, index),
							name,
							...state.participants.slice(index + 1),
						];

						keepOneEmptyItem(updatedParticipants);

						this.setState({
							participants: updatedParticipants,
						});
					}}
					onBlur={() => {
						const filteredParticipants = state.participants.filter(Boolean);
						keepOneEmptyItem(filteredParticipants);

						this.setState({
							participants: filteredParticipants,
						});
					}}
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
