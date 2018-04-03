import React, { PropTypes } from 'react';
import shortid from 'shortid';
import withRouter from 'react-router/lib/withRouter';
import { connect } from 'react-redux';
import assign from 'object-assign';

import { TopBar, TopBarHeading, TopBarIcon } from '../top-bar';
import Page from '../page';
import FlexContainer from '../flex-container';
import Separator from '../Separator';
import GreySubtitle from '../grey-subtitle';
import FormRow from '../form-row';
import FormLabel from '../form-label';
import FormInput from '../form-input';
import FormError from '../form-error';
import Spinner from '../spinner';

import styles from './index.css';

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
		const { props } = this;
		const now = new Date();
		const participants = [];

		if (props.participants) {
			props.participants.forEach((name) => {
				participants.push(createParticipant(name));
			});
		}

		participants.push(createParticipant());

		this.initialParticipants = {};

		participants
			.filter(({ name }) => name)
			.forEach(({ id, name }) => {
				this.initialParticipants[id] = name;
			});

		this.initialManagerName = props.managerName || '';

		return {
			name: props.name || '',
			manager: props.managerName || '',
			start: props.start || now,
			end: props.end || now,
			participants,
		};
	},

	goBack() {
		const { prevUrl, router } = this.props;
		router.push(prevUrl);
	},

	isSaveAvailable() {
		const { state } = this;

		const hasName = state.name.trim().length > 2;
		if (!hasName) return false;

		const hasManager = state.manager.trim().length > 1;
		if (!hasManager) return false;

		const participants = state.participants
			.filter(Boolean)
			.filter(({ name }) => name.trim())
			.map(markDuplicateParticipants([state.manager]));

		const participantsAreUnique = participants.length && !participants
			.filter(({ isDuplicate }) => isDuplicate)
			.length;
		if (!participantsAreUnique) return false;

		return true;
	},

	save() {
		const { props, state } = this;
		const { initialParticipants } = this;
		const participants = state.participants.filter(({ name }) => name.trim() !== '');
		const participantsByIds = {};

		participants.forEach(({ id, name }) => {
			participantsByIds[id] = name;
		});

		const deletedParticipants = Object
			.keys(initialParticipants)
			.filter((pId) => !participantsByIds[pId])
			.map((pId) => initialParticipants[pId]);

		const updatedParticipants = Object
			.keys(initialParticipants)
			.map((id) => ({
				id,
				name: initialParticipants[id],
			}))
			.filter(({ name }) => deletedParticipants.indexOf(name) === -1)
			.filter(({ id, name }) => participantsByIds[id] !== name)
			.map(({ id, name }) => ({
				old: name,
				updated: participantsByIds[id],
			}));

		if (this.initialManagerName !== state.manager) {
			updatedParticipants.push({
				old: this.initialManagerName,
				updated: state.manager,
			});
		}

		props.handleSave({
			name: state.name,
			manager: state.manager,
			start: state.start.valueOf(),
			end: state.end.valueOf(),
			participants: [state.manager].concat(participants.map(({ name }) => name.trim())),
			deletedParticipants,
			updatedParticipants,
		});
	},

	handleEventNameChange(event) {
		this.setState({
			name: event.target.value,
		});
	},

	handleStartDateChange(event) {
		const { state } = this;
		const start = new Date(event.target.value).valueOf();

		this.setState({
			start,
			end: start > state.end ? start : state.end,
		});
	},

	handleEndDateChange(event) {
		this.setState({
			end: new Date(event.target.value).valueOf(),
		});
	},

	handleStartDateBlur(event) {
		this.setState({
			start: new Date(event.target.value).valueOf() || new Date().valueOf(),
		});
	},

	handleEndDateBlur(event) {
		const { state } = this;
		const end = new Date(event.target.value).valueOf() || new Date(state.start).valueOf();

		this.setState({
			end: end < state.start ? state.start : end,
		});
	},

	handleChangeOrganizerName(event) {
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
		const { state, props, initialParticipants } = this;
		const { hasRepayedDebts } = props;
		const updatedParticipants = state.participants
			.slice()
			.map((participant) => {
				if (participant.id !== id) return participant;
				return {
					id,
					name,
					showRemovalWarning: hasRepayedDebts && initialParticipants[id] && !name.trim(),
				};
			})
			.map(markDuplicateParticipants([this.state.manager]));

		this.setState({
			participants: keepOneEmptyItem(updatedParticipants),
		});
	},

	handleParticipantBlur() {
		const { initialParticipants } = this;
		let result;

		if (this.props.hasRepayedDebts) {
			result = this.state.participants.map((participant) => {
				const participantCopy = assign({}, participant);

				if (!participantCopy.name.trim()) {
					participantCopy.name = initialParticipants[participantCopy.id] || '';
					participantCopy.showRemovalWarning = false;
				}

				return participantCopy;
			});
		} else {
			result = this.state.participants.slice();
		}

		result = result
			.filter(({ name }) => name.trim())
			.map(markDuplicateParticipants([this.state.manager]));

		this.setState({
			participants: keepOneEmptyItem(result),
		});
	},

	renderParticipants() {
		return this.state.participants.map((participant) => {
			const { id, name, isDuplicate, showRemovalWarning } = participant;
			let errorText;
			const isInvalid = isDuplicate || showRemovalWarning;

			if (isDuplicate) {
				errorText = 'Имена участников не должны повторяться';
			}

			if (showRemovalWarning) {
				errorText = 'Нельзя удалять участников из мероприятия с возвращёнными долгами';
			}

			return (
				<FormRow key={id}>
					<FormInput
						placeholder="Имя участника"
						invalid={isInvalid}
						value={name}
						onChange={(event) => this.handleParticipantChange(id, event.target.value)}
						onBlur={this.handleParticipantBlur}
					/>
					<FormError visible={isInvalid}>
						{errorText}
					</FormError>
				</FormRow>
			);
		});
	},

	renderTopBar() {
		const { props } = this;

		return (
			<TopBar bordered>
				<TopBarIcon icon="close" onClick={this.goBack} />
				<TopBarHeading title={props.pageTitle} />
				{props.isCreatingEvent ?
					<Spinner className={styles.spinner} />
					:
					<TopBarIcon
						icon="check-active"
						onClick={this.save}
						disabled={!this.isSaveAvailable()}
					/>
				}
			</TopBar>
		);
	},

	renderDatesInputs() {
		const { state } = this;

		return (
			<FlexContainer justifyContent="space-between">
				<FormRow className={styles['date-picker']}>
					<FormLabel htmlFor="event-date-start">Начало</FormLabel>
					<FormInput
						id="event-date-start"
						type="date"
						value={moment(state.start).format('YYYY-MM-DD')}
						onChange={this.handleStartDateChange}
						onBlur={this.handleStartDateBlur}
					/>
				</FormRow>

				<FormRow className={styles['date-picker']}>
					<FormLabel htmlFor="event-date-end">Завершение</FormLabel>
					<FormInput
						id="event-date-end"
						type="date"
						value={moment(state.end).format('YYYY-MM-DD')}
						min={moment(state.start).format('YYYY-MM-DD')}
						onChange={this.handleEndDateChange}
						onBlur={this.handleEndDateBlur}
					/>
				</FormRow>
			</FlexContainer>
		);
	},

	render() {
		const { state } = this;
		return (
			<Page>
				<Page.Header>
					{this.renderTopBar()}
				</Page.Header>

				<Page.Content style={{ padding: '8px 1rem 5rem' }}>
					<FormRow>
						<FormLabel htmlFor="event-name">Название мероприятия</FormLabel>
						<FormInput
							id="event-name"
							value={state.name}
							onChange={this.handleEventNameChange}
						/>
					</FormRow>

					{this.renderDatesInputs()}

					<Separator />

					<GreySubtitle style={{ margin: '0 -1rem', width: 'calc(100% + 32px)', paddingBottom: '0' }}>
						Добавить участников
					</GreySubtitle>

					<FormRow>
						<FormInput
							placeholder="Ваше имя"
							value={state.manager}
							onChange={this.handleChangeOrganizerName}
						/>
					</FormRow>

					{this.renderParticipants()}
				</Page.Content>
			</Page>
		);
	},
});

function keepOneEmptyItem(participants) {
	const result = participants.slice();

	if (result.filter(({ name }) => !name).length === 0) {
		result.push(createParticipant());
	}

	return result;
}

function markDuplicateParticipants(additionalNames) {
	const names = {};

	additionalNames.forEach((name) => {
		names[name.toLowerCase()] = 1;
	});

	return (item) => {
		const name = item.name.toLowerCase();
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

function mapStateToProps({ events }) {
	return {
		isCreatingEvent: events.isCreatingEvent,
	};
}

export default connect(mapStateToProps)(withRouter(EditEvent));
