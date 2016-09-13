import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import fetchEventData from '../actions/fetchEventData';
import updateEvent from '../actions/updateEvent';

import FlexContainer from '../components/FlexContainer';
import EditEvent from '../components/EditEvent';

import {createEventActionAsync, eventActionTypes} from '../actions/createEventAction';

const EditEventPage = React.createClass({
	componentDidMount() {
		const {props} = this;

		if (!props.currentEvent) {
			props.dispatch(fetchEventData(props.params.id));
		}
	},

	save(eventData) {
		const {currentEvent, params, dispatch} = this.props;
		const {
			name,
			manager,
			start,
			end,
			participants,
		} = eventData;
		const isEventParticipant = (pName) => participants.indexOf(pName) !== -1;

		let purchases = Object
			.keys(currentEvent.purchases || [])
			.map((purchaseId) => {
				const originalPurchase = currentEvent.purchases[purchaseId];
				const updatedPurchase = Object.assign({}, originalPurchase, {
					participants: originalPurchase.participants.filter(isEventParticipant),
				});

				if (updatedPurchase.participants.indexOf(updatedPurchase.payer) === -1) {
					return null;
				}

				if (updatedPurchase.participants.length < 2) {
					return null;
				}

				return {
					key: purchaseId,
					value: updatedPurchase,
				};
			})
			.filter(Boolean)
			.reduce((result, {key, value}) => {
				result[key] = value;
				return result;
			}, {});

		if (!Object.keys(purchases).length) {
			purchases = [];
		}

		const actions = Object
			.keys((currentEvent && currentEvent.actions) || [])
			.map((config) => Object.assign({config}, currentEvent.actions[config]));

		const updatedEvent = {
			name,
			manager,
			start,
			end,
			participants,
			purchases,
			actions,
		};

		dispatch(updateEvent({
			id: params.id,
			data: updatedEvent,
		}));

		const dispatchEventManipulation = (condition, actionType, parameters) => {
			if (condition) {
				dispatch(createEventActionAsync({
					eventId: this.props.params.id,
					eventActionInfo: {
						config: eventActionTypes[actionType](...parameters),
					},
				}));
			}
		};

		const getParticipants = (oldPs, newPs) => {
			const addedParticipants = newPs;
			oldPs.forEach((oldP) => {
				newPs.forEach((newP, newPIndex) => {
					if (oldP === newP) {
						addedParticipants.splice(newPIndex, 1);
					}
				});
			});

			return {
				addedParticipants,
			};
		};

		const filteredParticipants =
			getParticipants(
				currentEvent.participants,
				updatedEvent.participants
			);

		dispatchEventManipulation(
			(updatedEvent.name !== currentEvent.name),
			'changeEventName',
			[updatedEvent.manager, updatedEvent.name,
			moment(new Date()).startOf('hour').fromNow()]
		);

		dispatchEventManipulation(
			(updatedEvent.start !== currentEvent.start
			|| updatedEvent.end !== currentEvent.end),
			'changeEventDate',
			[
				updatedEvent.manager,
				updatedEvent.start,
				updatedEvent.end,
				moment(new Date()).startOf('hour').fromNow(),
			]
		);

		filteredParticipants.addedParticipants.forEach((p) => {
			dispatchEventManipulation(
				(filteredParticipants.addedParticipants),
				'addParticipantToEvent',
				[p, moment(new Date()).startOf('hour').fromNow()]
			);
		});
	},

	renderPreloader() {
		return (
			<FlexContainer alignItems="center" justifyContent="center" fullHeight>
				<CircularProgress />
			</FlexContainer>
		);
	},

	render() {
		const {currentEvent, params} = this.props;
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
					handleSave={this.save}
				/>
			);
		} else {
			result = this.renderPreloader();
		}

		return result;
	},
});

function mapStateToProps({events}) {
	return {
		currentEvent: events.currentEvent,
	};
}

export default connect(mapStateToProps)(withRouter(EditEventPage));
