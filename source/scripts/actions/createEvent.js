import {hashHistory} from 'react-router';

import {
	CREATE_EVENT,
} from '../constants';

import db from '../database';


export default function createEvent(payload) {
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
