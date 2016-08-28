import firebase from 'firebase';
import {hashHistory} from 'react-router';
import {CREATE_EVENT} from './constants';

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
