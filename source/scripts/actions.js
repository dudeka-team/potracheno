import {createAction} from 'redux-actions';

import db from './database';
import {
	READ_EVENTS,
	LOAD_EVENT_DATA,
} from './constants';


// const localEvents = ["-KQfLXhgWI7h2Du32Wll"];
const localEvents = localStorage.getItem('localEvents');

export function readEvents() {
	return {
		type: READ_EVENTS,
		payload: new Promise((resolve, reject) => {
			db
				.readEvents()
				.then(data => {
					const filteredEvents = {};
					const eventsKeys = Object.keys(data);
					localEvents.map(id => {
						if (eventsKeys.indexOf(id) !== -1)
							filteredEvents[id] = data[id];
					});
					return filteredEvents;
				})
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
