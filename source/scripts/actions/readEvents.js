import db from '../database';
import {copyEventsToLocal} from './copyEventsToLocal';
import {
	READ_EVENTS,
} from '../constants';

export function readEvents() {
	return dispatch => {
		dispatch({
			type: READ_EVENTS,
			payload: new Promise((resolve, reject) => {
				db
					.readEvents()
					.then(data => {
						resolve(data);
						return data;
					})
					.then(data => {
						dispatch(copyEventsToLocal(data))
					})
					.catch(reject);
			}),
		});
	};
}
