import {hashHistory} from 'react-router';
import {CREATE_EVENT} from './constants';
import serverApi from 'api/remote';

export function createEvent(payload) {
	return {
		type: CREATE_EVENT,
		payload,
	};
}

export function createEventAsync(payload) {
	return (dispatch) => {
		serverApi.saveToDb('events', payload).then((result) => {
			dispatch(createEvent({
				key: result.key,
				eventInfo: payload,
			}));

			hashHistory.push('/events');
		});
	};
}
