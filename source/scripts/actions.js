import firebase from 'firebase';
import {hashHistory} from 'react-router';
import {CREATE_EVENT, READ_EVENTS} from './constants';

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
				eventInfo: payload,
			}));

			hashHistory.push('/events');
		});
	};
}

export function readEvents(payload) {
	return {
		type: READ_EVENTS,
		payload,
	};
}

export function readEventsAsync(payload) {
	return (dispatch) => {
		firebase.database().ref('events').once('value').then(result => {
			dispatch(readEvents({
				key: result.key,
				eventsList: result.val(),
			}));
		})
	}
}
