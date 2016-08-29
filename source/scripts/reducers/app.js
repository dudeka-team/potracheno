import {CREATE_EVENT, READ_EVENTS} from '../constants';

const initialState = {
	events: [],
	eventsById: {},
	isDataLoaded: false,
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

		case READ_EVENTS: {
			return Object.assign({}, state, {
				events: Object.keys(payload.eventsList),
				eventsById: payload.eventsList,
				isDataLoaded: true,
			});
		}

		default: {
			return state;
		}
	}
}
