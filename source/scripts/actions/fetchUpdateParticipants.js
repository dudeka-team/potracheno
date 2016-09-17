import {browserHistory} from 'react-router';
import db from '../database';
import {
	FETCH_UPDATE_PARTICIPANTS,
} from '../constants';

export default function fetchUpdateParticipants(eventId, participantsList) {
	return {
		type: FETCH_UPDATE_PARTICIPANTS,
		payload: new Promise((resolve, reject) => {
			db
				.fetchUpdateParticipants(eventId, participantsList)
				.then(resolve)
				.then(() => browserHistory.push(`events/${eventId}`))
				.catch(reject);
		}),
	};
}
