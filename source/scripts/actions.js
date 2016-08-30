import {hashHistory} from 'react-router';
import serverApi from './database';
import {CREATE_EVENT} from './constants';

export function createEvent(payload) {
	return {
		type: CREATE_EVENT,
		payload,
	};
}

export function createEventAsync(payload) {
	return (dispatch) => {
		serverApi.saveEvent(payload).then((result) => {
			dispatch(createEvent(result));

			hashHistory.push('/events');
		});
	};
}
