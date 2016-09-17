import {browserHistory} from 'react-router';

import {
	UPDATE_EVENT,
} from '../constants';

import setLocalEvents from './setLocalEvents';

import db from '../database';


export default function updateEvent(payload) {
	return (dispatch) => ({
		type: UPDATE_EVENT,
		payload: new Promise((resolve, reject) => {
			db
				.updateEvent(payload)
				.then(resolve)
				.then(() => {
					const {currentUserNameChangeData} = payload;

					if (currentUserNameChangeData) {
						dispatch(setLocalEvents(payload.id, currentUserNameChangeData.updated));
					}
				})
				.then(() => browserHistory.push(`/events/${payload.id}`))
				.catch(reject);
		}),
	});
}
