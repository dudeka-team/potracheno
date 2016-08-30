import firebase from 'firebase';
import {hashHistory} from 'react-router';
import {
	CREATE_EVENT,
	LOAD_EVENT_DATA,
} from './constants';

export function createEvent(payload) {
	return {
		type: CREATE_EVENT,
		payload,
	};
}

export function createEventAsync(payload) {
	return (dispatch) => {
		firebase.database().ref('events').push(payload).then((result) => {
			dispatch(createEvent({
				key: result.key,
				value: payload,
			}));

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
