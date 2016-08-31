import {hashHistory} from 'react-router';
import {createAction} from 'redux-actions';
import firebase from 'firebase';
import db from './database';
import {
	READ_EVENTS,
	CREATE_EVENT,
	LOAD_EVENT_DATA,
	CREATE_PURCHASE,
} from './constants';

export function createEvent(payload) {
	return {
		type: CREATE_EVENT,
		payload: new Promise((resolve, reject) => {
			db
				.saveEvent(payload)
				.then(resolve)
				.then(() => hashHistory.push('/events'))
				.catch(reject);
		}),
	};
}

export function readEvents() {
	return {
		type: READ_EVENTS,
		payload: new Promise((resolve, reject) => {
			db
				.readEvents()
				.then(resolve)
				.catch(reject);
		}),
	};
}

export const loadEventData = createAction(LOAD_EVENT_DATA);

export function loadEventDataAsync(eventId) {
	return dispatch => {
		db.loadEvent(eventId).then(result => {
			dispatch(loadEventData(result));
		});
	};
}

export const createPurchase = createAction(CREATE_PURCHASE);

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