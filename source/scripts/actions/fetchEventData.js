import db from '../database';
import {
	FETCH_EVENT_DATA,
} from '../constants';

export default function loadEventData(eventId) {
	return {
		type: FETCH_EVENT_DATA,
		payload: new Promise((resolve, reject) => {
			db
				.loadEvent(eventId)
				.then(resolve)
				.catch(reject);
		}),
	};
}
