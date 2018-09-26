import db from '../database';
import { READ_EVENTS } from '../constants';

export default function readEvents() {
	return dispatch => {
		dispatch({
			type: READ_EVENTS,
			payload: new Promise((resolve, reject) => {
				db.readEvents()
					.then(data => {
						resolve(data);
						return data;
					})
					.catch(reject);
			}),
		});
	};
}
