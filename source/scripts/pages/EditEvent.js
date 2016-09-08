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
			actions
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

		const updatedEvent = {
			name,
			manager,
			start,
			end,
			participants,
			purchases,
			actions
		};

		const dispatchEventManipulation = (condition, parameters) => {
			if (condition) {
				dispatch(createEventActionAsync({
					eventId: this.props.params.id,
					eventActionInfo: {
						config: eventActionTypes
							.changeEventName(...parameters),
					},
				}));
			}
		}

		dispatchEventManipulation(
			(updatedEvent.name !== this.props.currentEvent.name), 
			[updatedEvent.manager, updatedEvent.name, 
			moment(new Date()).startOf('hour').fromNow()]
		)

		// if (updatedEvent.name !== this.props.currentEvent.name) {
		// 	dispatch(createEventActionAsync({
		// 		eventId: this.props.params.id,
		// 		eventActionInfo: {
		// 			config: eventActionTypes
		// 				.changeEventName(updatedEvent.manager,
		// 								updatedEvent.name,
		// 								moment(new Date()).startOf('hour').fromNow(),
		// 							),
		// 		},
		// 	}));
		// }

		dispatch(updateEvent({
			id: params.id,
			data: updatedEvent,
		}));

		
	},

	renderPreloader() {
		return (
			<FlexContainer alignItems="center" justifyContent="center">
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
