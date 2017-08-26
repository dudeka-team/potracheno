import React from 'react';
import withRouter from 'react-router/lib/withRouter';
import { connect } from 'react-redux';
import assign from 'object-assign';

import fetchEventData from '../actions/fetchEventData';
import updateEvent from '../actions/updateEvent';

import FlexContainer from '../components/FlexContainer';
import EditEvent from '../components/EditEvent';
import Spinner from '../components/spinner/spinner';

import { createEventActionAsync, eventActionTypes, getDiff } from '../actions/createEventAction';

const EditEventPage = React.createClass({
	componentDidMount() {
		const { props } = this;

		if (!props.currentEvent) {
			props.dispatch(fetchEventData(props.params.id));
		}
	},

	save(updatedEvent) {
		const { currentEvent, currentUserName, params, dispatch } = this.props;
		const {
			manager,
			participants,
			updatedParticipants,
			deletedParticipants,
		} = updatedEvent;

		let purchases = Object
			.keys(currentEvent.purchases || {})
			.map((purchaseId) => {
				const originalPurchase = currentEvent.purchases[purchaseId];

				// если организатор покупки был удалён, покупку тоже удаляем
				if (deletedParticipants.indexOf(originalPurchase.payer) !== -1) {
					return null;
				}

				const updatedPurchaseParticipants = originalPurchase.participants
					// убираем удалённых из мероприятия участников
					.filter((name) => deletedParticipants.indexOf(name) === -1)
					// заменяем старые имена на новые
					.map((name) => {
						const changedData = updatedParticipants.filter(({ old }) => old === name)[0];

						if (changedData) {
							return changedData.updated;
						}

						return name;
					});

				let payer = originalPurchase.payer;
				const changedPayerData = updatedParticipants.filter(({ old }) => old === payer)[0];

				if (changedPayerData) {
					payer = changedPayerData.updated;
				}

				const purchaseParticipantsWithPayer = updatedPurchaseParticipants
					.concat([payer])
					.filter((name, index, array) => array.indexOf(name) === index);

				if (purchaseParticipantsWithPayer.length < 2) {
					return null;
				}

				return assign({}, originalPurchase, {
					payer,
					participants: updatedPurchaseParticipants,
				});
			})
			.filter(Boolean);

		if (!purchases.length) {
			purchases = [];
		}

		const actions = Object
			.keys((currentEvent && currentEvent.actions) || [])
			.map((config) => assign({ config }, currentEvent.actions[config]));

		const finalEvent = {
			name: updatedEvent.name,
			start: updatedEvent.start,
			end: updatedEvent.end,
			repayedDebts: currentEvent.repayedDebts,
			manager,
			participants,
			purchases,
			actions,
		};

		if (!currentEvent.repayedDebts) {
			delete finalEvent.repayedDebts;
		}

		const currentUserNameChangeData = updatedParticipants
			.filter(({ old }) => old === currentUserName)[0];

		dispatch(updateEvent({
			id: params.id,
			data: finalEvent,
			currentUserNameChangeData,
		}));

		const filteredParticipants = getDiff(
			currentEvent.participants,
			updatedEvent.participants
		);

		if (updatedEvent.name !== currentEvent.name) {
			dispatch(createEventActionAsync({
				eventId: this.props.params.id,
				eventActionInfo: {
					config: eventActionTypes.changeEventName(
						currentUserName,
						updatedEvent.name,
						(new Date()).getTime()
					),
				},
			}));
		}

		if (updatedEvent.start !== currentEvent.start
			|| updatedEvent.end !== currentEvent.end) {
			dispatch(createEventActionAsync({
				eventId: this.props.params.id,
				eventActionInfo: {
					config: eventActionTypes.changeEventDate(
						currentUserName,
						moment(updatedEvent.start).format('DD MMMM'),
						moment(updatedEvent.end).format('DD MMMM'),
						(new Date()).getTime()
					),
				},
			}));
		}

		filteredParticipants.added.forEach((p) => {
			if (filteredParticipants.added) {
				dispatch(createEventActionAsync({
					eventId: this.props.params.id,
					eventActionInfo: {
						config: eventActionTypes.addParticipantToEvent(
							currentUserName,
							p,
							(new Date()).getTime()
						),
					},
				}));
			}
		});

		filteredParticipants.removed.forEach((p) => {
			if (filteredParticipants.removed) {
				dispatch(createEventActionAsync({
					eventId: this.props.params.id,
					eventActionInfo: {
						config: eventActionTypes.removeParticipantFromEvent(
							currentUserName,
							p,
							(new Date()).getTime()
						),
					},
				}));
			}
		});
	},

	renderPreloader() {
		return (
			<FlexContainer fullHeight alignItems="center" justifyContent="center">
				<Spinner />
			</FlexContainer>
		);
	},

	render() {
		const { currentEvent, params } = this.props;
		let result;

		if (currentEvent) {
			result = (
				<EditEvent
					pageTitle="Редактирование мероприятия"
					prevUrl={`/events/${params.id}`}
					name={currentEvent.name}
					managerName={currentEvent.manager}
					start={new Date(currentEvent.start)}
					end={new Date(currentEvent.end)}
					participants={currentEvent.participants.filter((name) => name !== currentEvent.manager)}
					hasRepayedDebts={Boolean(currentEvent.repayedDebts)}
					handleSave={this.save}
				/>
			);
		} else {
			result = this.renderPreloader();
		}

		return result;
	},
});

function mapStateToProps({ events }) {
	return {
		currentEvent: events.currentEvent,
		currentUserName: events.currentUserName,
	};
}

export default connect(mapStateToProps)(withRouter(EditEventPage));
