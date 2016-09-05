import {hashHistory} from 'react-router';

import {
	CREATE_EVENT,
} from '../constants';

import setLocalEvents from './setLocalEvents';

import db from '../database';


export default function createEvent(payload) {
	return dispatch => {
		dispatch({
			type: CREATE_EVENT,
			payload: new Promise((resolve, reject) => {
				db
					.saveEvent(payload)
					.then(data => {
						resolve(data); 
						return data;
					})
					.then(data => {
						dispatch(setLocalEvents(data.key, data.manager));
						hashHistory.push('/events')
					})
					.catch(reject);
			}),
		});
	};
}
