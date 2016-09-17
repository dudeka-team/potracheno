import assign from 'object-assign';
import {
	SET_LOCAL_EVENTS,
} from '../constants';

export default function setLocalEvents(id, name) {
	const newLocalEventToSave = {};
	newLocalEventToSave[id] = name;

	const oldLocalEvents = JSON.parse(localStorage.getItem('localEvents') || '{}');
	const newLocalEvents = assign(oldLocalEvents, newLocalEventToSave);

	localStorage.setItem('localEvents', JSON.stringify(newLocalEvents));

	return {
		type: SET_LOCAL_EVENTS,
		payload: newLocalEvents,
	};
}
