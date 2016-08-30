import {hashHistory} from 'react-router';
import serverApi from './database';
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
		serverApi.saveEvent(payload).then(result => {
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
	return (dispatch) => {
		firebase
			.database()
			.ref(`/events/${eventId}`)
			.once('value')
			.then((snapshot) => {
				dispatch(loadEventData({
					key: snapshot.key,
					value: snapshot.val(),
				}));
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
