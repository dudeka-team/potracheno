import { GET_LOCAL_EVENTS } from '../constants';
import db from '../database';

export default function getLocalEvents() {
	const localEvents = db.getLocalEvents();

	return {
		type: GET_LOCAL_EVENTS,
		payload: localEvents,
	};
}
