import {
	COPY_EVENTS_TO_LOCAL,
} from '../constants';

export function copyEventsToLocal(events) {

	const filteredEvents = {};

	const localEvents = JSON.parse(localStorage.getItem('localEvents') || '{}');

	const eventsKeys = Object.keys(events);

	Object.keys(localEvents).map(id => {
		if (eventsKeys.indexOf(id) !== -1) {
			filteredEvents[id] = events[id];
		}
	});

	localStorage
			.setItem('localEventsCopy',
				JSON.stringify(filteredEvents)
			);
}
