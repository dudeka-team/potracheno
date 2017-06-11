import { push } from 'react-router-redux/lib/actions';

import {
	CREATE_EVENT,
} from '../constants';

import setLocalEvents from './setLocalEvents';
import openShareLinkPopup from './openShareLinkPopup';

import db from '../database';


export default function createEvent(payload) {
	return dispatch => {
		dispatch({
			type: CREATE_EVENT,
			payload: new Promise((resolve, reject) => {
				db
					.saveEvent(payload)
					.then(data => {
						resolve(data);
						return data;
					})
					.then(data => {
						dispatch(setLocalEvents(data.key, data.eventInfo.manager));
						dispatch(push(`/events/${data.key}`));
						dispatch(openShareLinkPopup());
					})
					.catch(reject);
			}),
		});
	};
}
