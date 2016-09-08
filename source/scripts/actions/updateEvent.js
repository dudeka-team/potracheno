import {hashHistory} from 'react-router';

import {
	UPDATE_EVENT,
} from '../constants';

import db from '../database';


export default function updateEvent(payload) {
	return {
		type: UPDATE_EVENT,
		payload: new Promise((resolve, reject) => {
			db
				.updateEvent(payload)
				.then(resolve)
				.then(() => hashHistory.push(`/events/${payload.id}`))
				.catch(reject);
		}),
	};
}
