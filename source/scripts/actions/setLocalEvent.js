import {
	SET_LOCAL_EVENTS,
} from '../constants';

export default function setLocalEvents() {
	const localEvents = JSON.parse(localStorage.getItem('localEvents') || "{}");
	return {
		type: SET_LOCAL_EVENTS,
		payload: localEvents,
	};
}
