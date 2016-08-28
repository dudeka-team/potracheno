import {CREATE_EVENT} from '../constants';

const initialState = {
	events: [],
	eventsById: {},
};

export default function appReducer(state = initialState, {type, payload}) {
	switch (type) {
		case CREATE_EVENT: {
			const {key} = payload;
			const newEventsList = state.events.slice();

			if (newEventsList.indexOf(key) === -1) {
				newEventsList.push(key);
			}

			return Object.assign({}, state, {
				events: newEventsList,
				eventsById: Object.assign({}, state.eventsById, {
					[key]: payload.eventInfo,
				}),
			});
		}

		default: {
			return state;
		}
	}
}
