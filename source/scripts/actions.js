import {hashHistory} from 'react-router';
import db from './database';
import {
	CREATE_EVENT,
	LOAD_EVENT_DATA,
	CREATE_PURCHASE,
} from './constants';

export function createEvent(payload) {
	return {
		type: CREATE_EVENT,
		payload,
	};
}

export function createEventAsync(payload) {
	return dispatch => {
		db.saveEvent(payload).then(result => {
			dispatch(createEvent(result));

			hashHistory.push('/events');
		});
	};
}

export function loadEventData(payload) {
	return {
		type: LOAD_EVENT_DATA,
	};
}

function createPurchase(payload) {
	return {
		type: CREATE_PURCHASE,
	};
}

export function loadEventDataAsync(eventId) {
	return dispatch => {
		db.loadEvent(eventId).then(result => {
			dispatch(loadEventData(result));
		});
	};
}

export function createPurchaseAsync(payload) {
	return dispatch => {
		firebase.database().ref('purchases/').push(payload).then(result => {
			dispatch(createPurchase({
				key: result.key,
				purchaseInfo: payload,
			}));
		});

		hashHistory.push('event');
	};
}
