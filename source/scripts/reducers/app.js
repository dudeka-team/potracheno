import {
	CREATE_EVENT,
	LOAD_EVENT_DATA,
	CREATE_PURCHASE,
} from '../constants';

const initialState = {
	events: [],
	eventsById: {},
	currentEvent: null,
};

export default function appReducer(state = initialState, {type, payload}) {
	if (type === CREATE_PURCHASE) {
		console.log(state);
	}
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

		case CREATE_PURCHASE: {
			const {eventId} = payload;
			const currentEvent = Object.assign({}, state.currentEvent);
			currentEvent.purchases = Object.assign({}, currentEvent.purchases, {
				[payload.key]: payload.purchaseData,
			});
			const newEventsList = state.events.slice();

			return Object.assign({}, state, {
				currentEvent,
				eventsById: Object.assign({}, state.eventsById, {
					[currentEvent.id]: currentEvent
				}),
			});
		}

		default: {
			return state;
		}
	}
}
