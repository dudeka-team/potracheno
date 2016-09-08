import {hashHistory} from 'react-router';

import {
	RELOGIN,
} from '../constants';

import selLocalEvents from './setLocalEvents';

export default function relogin(id) {
	return (dispatch) => {
		dispatch({
			type: RELOGIN,
			payload: new Promise((resolve) => {
				dispatch(selLocalEvents(id)); // вместо name передаётся undefined и юзер разлогинивается
				hashHistory.push(`/events/${id}`);
				resolve(id);
			}),
		});
	};
}
