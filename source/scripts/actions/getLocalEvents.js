import {
	GET_LOCAL_EVENTS,
} from '../constants';
import db from '../database';

function getOnesignalTags(localEvents) {
	const localEventsIds = Object.keys(localEvents);
	const result = {};

	localEventsIds.forEach((id) => {
		result[id] = 1;
	});

	return result;
}

export default function getLocalEvents() {
	const localEvents = db.getLocalEvents();
	window.OneSignal.push(['sendTags', getOnesignalTags(localEvents)]);

	return {
		type: GET_LOCAL_EVENTS,
		payload: localEvents,
	};
}
