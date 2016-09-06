import {
	GET_LOCAL_EVENTS,
} from '../constants';

export default function getLocalEvents() {
	const localEvents = JSON.parse(localStorage.getItem('localEvents') || "{}");
	return {
		type: GET_LOCAL_EVENTS,
		payload: localEvents,
	};
}
