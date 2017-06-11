import { createAction } from 'redux-actions';

import db from './database';
import {
	READ_EVENTS,
	LOAD_EVENT_DATA,
} from './constants';

export function readEvents() {
	return {
		type: READ_EVENTS,
		payload: new Promise((resolve, reject) => {
			db
				.readEvents()
				.then(resolve)
				.catch(reject);
		}),
	};
}

export const loadEventData = createAction(LOAD_EVENT_DATA);

export function loadEventDataAsync(eventId) {
	return dispatch => {
		db.loadEvent(eventId).then(result => {
			dispatch(loadEventData(result));
		});
	};
}
