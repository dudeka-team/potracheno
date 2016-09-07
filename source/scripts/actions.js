import {createAction} from 'redux-actions';
import getLocalEvents from 'actions/getLocalEvents';

import db from './database';
import {
	READ_EVENTS,
	LOAD_EVENT_DATA,
} from './constants';

export function readEvents(localEvents) {
	return {
		type: READ_EVENTS,
		payload: new Promise((resolve, reject) => {
			db
				.readEvents()
				// .then(data => {
				// 	// const localEvents =
				// 	// 	Object.keys(
				// 	// 		JSON.parse(
				// 	// 			localStorage
				// 	// 				.getItem('localEvents') || "{}"
				// 	// 				)
				// 	// 		);
				
					// const filteredEvents = {};
					// const eventsKeys = Object.keys(data);
					// Object.keys(localEvents).map(id => {
					// 	if (eventsKeys.indexOf(id) !== -1)
					// 		filteredEvents[id] = data[id];
					// });
					// return filteredEvents;
				// })
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
