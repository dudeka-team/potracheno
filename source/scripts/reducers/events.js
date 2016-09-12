import {handleActions} from 'redux-actions';

import {
	CREATE_EVENT_LOADING,
	CREATE_EVENT_SUCCESS,
	CREATE_EVENT_ERROR,

	READ_EVENTS_LOADING,
	READ_EVENTS_SUCCESS,
	READ_EVENTS_ERROR,

	FETCH_EVENT_DATA_LOADING,
	FETCH_EVENT_DATA_SUCCESS,
	FETCH_EVENT_DATA_ERROR,

	CHANGE_CURRENT_EVENT,
	CREATE_PURCHASE,

	GET_LOCAL_EVENTS,
	SET_LOCAL_EVENTS,

	FETCH_UPDATE_PARTICIPANTS_SUCCESS,

	CHANGE_PURCHASE,

	REPAY_DEBT_SUCCESS,

	FETCH_PURCHASE_DELETE,
} from '../constants';

const {assign} = Object;
const initialState = {
	events: [],
	eventsById: {},
	localEvents: {},
	currentEvent: null,
	isCreatingEvent: false,
	isFetchingEvent: false,
	loaded: false,
};

export default handleActions({
	[FETCH_EVENT_DATA_LOADING]: (state) => assign({}, state, {
		isFetchingEvent: true,
	}),

	[FETCH_EVENT_DATA_ERROR]: (state) => assign({}, state, {
		isFetchingEvent: false,
	}),

	[FETCH_EVENT_DATA_SUCCESS]: (state, {payload}) => {
		return assign({}, state, {
			eventsById: assign({}, state.eventsById, {
				[payload.key]: payload.value,
			}),
			currentEvent: assign({}, payload.value, {
				participantName: state.localEvents[payload.key],
			}),
			isFetchingEvent: false,
		});
	},

	[CREATE_EVENT_LOADING]: (state) => assign({}, state, {
		isCreatingEvent: true,
	}),

	[CREATE_EVENT_SUCCESS]: stopCreatingEvent,
	[CREATE_EVENT_ERROR]: stopCreatingEvent,

	[READ_EVENTS_LOADING]: (state) => assign({}, state, {
		isReadingEvents: true,
	}),

	[READ_EVENTS_SUCCESS]: (state, {payload}) => {
		const filteredEvents = {};
		const eventsKeys = Object.keys(payload);
		Object.keys(state.localEvents).map(id => {
			if (eventsKeys.indexOf(id) !== -1) {
				filteredEvents[id] = payload[id];
			}
		});

		return assign({}, state, {
			events: Object.keys(filteredEvents),
			eventsById: filteredEvents,
			loaded: true,
		});
	},

	[READ_EVENTS_ERROR]: (state) => assign({}, state, {
		isReadingEvents: false,
	}),
	[CHANGE_CURRENT_EVENT]: (state, {payload}) => assign({}, state, {
		currentEvent: state.eventsById[payload],
	}),

	[CREATE_PURCHASE]: (state, {payload}) => {
		const currentEvent = Object.assign({}, state.currentEvent);
		currentEvent.purchases = Object.assign({}, currentEvent.purchases, {
			[payload.key]: payload.purchaseData,
		});
		return Object.assign({}, state, {
			currentEvent,
			eventsById: Object.assign({}, state.eventsById, {
				[currentEvent.id]: currentEvent,
			}),
		});
	},

	[GET_LOCAL_EVENTS]: (state, {payload}) => {
		return Object.assign({}, state, {localEvents: payload});
	},

	[SET_LOCAL_EVENTS]: (state, {payload}) => {
		return Object.assign({}, state, {localEvents: payload});
	},

	[CHANGE_PURCHASE]: (state, {payload}) => {
		const {eventId, purchase} = payload;
		const {eventsById} = state;

		const participants = purchase.participants.slice();
		const changedPurchase = assign({}, purchase, {participants});

		const changedEvents = assign({}, eventsById, {
			[eventId]: assign({}, eventsById[eventId], {
				purchases: assign({}, eventsById[eventId].purchases, {changedPurchase}),
			}),
		});

		return assign({}, state, {
			eventsById: assign({}, eventsById, changedEvents),
		});
	},

	[REPAY_DEBT_SUCCESS]: (state, {payload}) => {
		console.log(payload);
		const {eventId, sum, name}  = payload;

		const updatedRepayedDebts = Object.assign({}, state.eventsById[eventId].repayedDebts, {[name]: sum});
		const updatedEvent = Object.assign({}, state.eventsById[eventId], {repayedDebts: updatedRepayedDebts});

		return Object.assign({}, state, {
			eventsById: assign({}, state.eventsById, {[eventId]: updatedEvent}),
		});
	},

	[FETCH_PURCHASE_DELETE]: (state, {payload}) => {
		const {eventId, purchaseId} = payload;
		const {eventsById} = state;

		const purchases = assign({}, eventsById[eventId].purchases);
		delete purchases[purchaseId];

		const changedEvent = assign({}, eventsById[eventId], {purchases});
		const changedEvents = assign({}, eventsById, {[eventId]: changedEvent});

		return assign({}, state, {
			eventsById: assign({}, changedEvents),
		});
	},

	[FETCH_UPDATE_PARTICIPANTS_SUCCESS]: (state, {payload}) => {
		const {eventId, participantsList} = payload;
		const {eventsById} = state;
		const changedEvent = assign({}, eventsById[eventId], {
			participants: participantsList,
		});
		return assign({}, state, {
			eventsById: assign({}, eventsById, {
				[eventId]: changedEvent,
			}),
			currentEvent: changedEvent,
		});
	},

}, initialState);

function stopCreatingEvent(state) {
	return assign({}, state, {
		isCreatingEvent: false,
	});
}
