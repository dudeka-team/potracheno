import {
	CREATE_EVENT,
	LOAD_EVENT_DATA,
} from '../constants';

const initialState = {
	events: [],
	eventsById: {},
	currentEvent: null,
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
					[key]: payload.value,
				}),
			});
		}

		case LOAD_EVENT_DATA: {
			return Object.assign({}, state, {
				eventsById: Object.assign({}, state.eventsById, {
					[payload.key]: payload.value,
				}),
				currentEvent: payload.value,
			});
		}

		default: {
			return state;
		}
	}
}
