import {hashHistory} from 'react-router';
import firebase from 'firebase';
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
		payload,
	};
}

function createPurchase(payload) {
	return {
		type: CREATE_PURCHASE,
		payload,
	};
}

export function loadEventDataAsync(eventId) {
	return dispatch => {
		db.loadEvent(eventId).then(result => {
			dispatch(loadEventData(result));
		});
	};
}
