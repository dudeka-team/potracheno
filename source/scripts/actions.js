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
		payload
	};
}

export function loadEventDataAsync(eventId) {
	return dispatch => {
		db.loadEvent(eventId).then(result => {
			dispatch(loadEventData(result));
		});
	};
}

function createPurchase(payload) {
	return {
		type: CREATE_PURCHASE,
		payload,
	};
}

export function createPurchaseAsync(payload) {
	return dispatch => {
		db.addPurchase(payload.eventId, payload.purchaseData).then(result => {
			dispatch(createPurchase({
				key: result.key,
				purchaseData: result.purchaseData,
			}));
		});
	};
}
