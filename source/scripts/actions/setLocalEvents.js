import {
	SET_LOCAL_EVENTS,
} from '../constants';

export default function setLocalEvents(id, name) {

	console.log(id, name);

	const newLocalEventToSave = {};
	newLocalEventToSave[id] = name;

	const oldLocalEvents = JSON.parse(localStorage.getItem('localEvents') || "{}");
	
	localStorage
			.setItem('localEvents', 
				JSON.stringify(Object.assign(oldLocalEvents, newLocalEventToSave))
			);

	const newLocalEvents = JSON.parse(localStorage.getItem('localEvents') || "{}");
	
	return {
		type: SET_LOCAL_EVENTS,
		payload: newLocalEvents,
	};
}
