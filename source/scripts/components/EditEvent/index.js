import React, {PropTypes} from 'react';
import shortid from 'shortid';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

import {TopBar, TopBarHeading, TopBarIcon} from '../TopBar';
import {Page, PageContent} from '../Page';


function createParticipant(name = '') {
	return {
		name,
		id: shortid.generate(),
	};
}

const EditEvent = React.createClass({
	propTypes: {
		pageTitle: PropTypes.string.isRequired,
		prevUrl: PropTypes.string.isRequired,
		name: PropTypes.string,
		managerName: PropTypes.string,
		start: PropTypes.object,
		end: PropTypes.object,
		participants: PropTypes.array,
		handleSave: PropTypes.func.isRequired,
	},

	getInitialState() {
		const {props} = this;
		const now = new Date();
		const participants = [];

		if (props.participants) {
			props.participants.forEach((name) => {
				participants.push(createParticipant(name));
			});
		}

		participants.push(createParticipant());

		return {
			name: props.name || '',
			manager: props.managerName || '',
			start: props.start || now,
			end: props.end || now,
			participants,
		};
	},

	goBack() {
		const {prevUrl, router} = this.props;
		router.push(prevUrl);
	},

	save() {
		const {props, state} = this;

		props.handleSave({
			name: state.name,
			manager: state.manager,
			start: state.start.valueOf(),
			end: state.end.valueOf(),
			participants: state.participants.map(({name}) => name).filter(Boolean).concat(state.manager),
		});
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

	handleManagerChange(event) {
		const managerName = event.target.value;
		const updatedParticipants = this.state.participants
			.slice()
			.map(markDuplicateParticipants([managerName]));

		this.setState({
			manager: managerName,
			participants: updatedParticipants,
		});
	},

	handleParticipantChange(id, name) {
		const {state} = this;
		const updatedParticipants = state.participants
			.slice()
			.map((participant) => {
				if (participant.id !== id) return participant;
				return {
					id,
					name,
				};
			})
			.map(markDuplicateParticipants([this.state.manager]));

		this.setState({
			participants: keepOneEmptyItem(updatedParticipants),
		});
	},

	handleParticipantBlur() {
		const filteredParticipants = this
			.state
			.participants
			.filter(({name}) => name.trim())
			.map(markDuplicateParticipants([this.state.manager]));

		this.setState({
			participants: keepOneEmptyItem(filteredParticipants),
		});
	},

	isSaveAvailable() {
		const {state} = this;

		const hasName = state.name.trim().length > 2;
		if (!hasName) return false;

		const hasManager = state.manager.trim().length > 1;
		if (!hasManager) return false;

		const participants = state.participants
			.filter(({name}) => name.trim())
			.map(markDuplicateParticipants([state.manager]));

		const participantsAreUnique = participants.length && !participants
			.filter(({isDuplicate}) => isDuplicate)
			.length;
		if (!participantsAreUnique) return false;

		return true;
	},

	renderParticipants() {
		return this.state.participants.map((participant) => {
			const {id, name, isDuplicate} = participant;
			return (
				<div key={id}>
					<TextField
						fullWidth
						hintText={'Имя участника'}
						value={name}
						errorText={isDuplicate && 'Имена участников не должны повторяться'}
						onBlur={this.handleParticipantBlur}
						onChange={(event) => this.handleParticipantChange(id, event.target.value)}
					/>
				</div>
			);
		});
	},

	render() {
		const {state, props} = this;
		return (
			<Page>
				<TopBar>
					<TopBarIcon icon="arrow-back" onClick={this.goBack} />
					<TopBarHeading title={props.pageTitle} />
					{props.isCreatingEvent ?
						<CircularProgress size={0.3} />
						:
						<TopBarIcon
							icon="check-active"
							onClick={this.save}
							disabled={!this.isSaveAvailable()}
						/>
					}
				</TopBar>
				<PageContent style={{padding: '0 1rem 5rem'}}>
					<TextField
						fullWidth
						floatingLabelText="Название мероприятия"
						value={state.name}
						onChange={this.handleEventNameChange}
					/>

					<DatePicker
						fullWidth
						floatingLabelText="Начало"
						formatDate={formatDate}
						onChange={state.handleStartDateChange}
						minDate={state.start}
						value={state.start}
					/>

					<DatePicker
						fullWidth
						floatingLabelText="Завершение"
						formatDate={formatDate}
						onChange={state.handleEndDateChange}
						minDate={state.start}
						value={state.end}
					/>

					<TextField
						fullWidth
						floatingLabelText="Имя организатора"
						value={state.manager}
						onChange={this.handleManagerChange}
					/>

					{this.renderParticipants()}
				</PageContent>
			</Page>
		);
	},
});

function formatDate(date) {
	const formattedDate = moment(date).format('dd, DD MMM YYYY');
	return formattedDate[0].toUpperCase() + formattedDate.slice(1);
}

function keepOneEmptyItem(participants) {
	const result = participants.slice();

	if (result.filter(({name}) => !name).length === 0) {
		result.push(createParticipant());
	}

	return result;
}

function markDuplicateParticipants(additionalNames) {
	const names = {};

	additionalNames.forEach((name) => {
		names[name] = 1;
	});

	return (item) => {
		const {assign} = Object;
		const {name} = item;
		const isDuplicate = !!names[name];

		if (!name.trim()) return item;

		const result = assign({}, item, {
			isDuplicate,
		});

		if (!isDuplicate) {
			names[name] = 1;
		}

		return result;
	};
}

function mapStateToProps({events}) {
	return {
		isCreatingEvent: events.isCreatingEvent,
	};
}

export default connect(mapStateToProps)(withRouter(EditEvent));
