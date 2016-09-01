import {handleActions} from 'redux-actions';

import {
	CREATE_EVENT_LOADING,
	CREATE_EVENT_SUCCESS,
	CREATE_EVENT_ERROR,
	READ_EVENTS_LOADING,
	READ_EVENTS_SUCCESS,
	READ_EVENTS_ERROR,
	CHANGE_CURRENT_EVENT,
	CREATE_PURCHASE,
} from '../constants';


const {assign} = Object;
const initialState = {
	events: [],
	eventsById: {},
	currentEvent: null,
	isCreatingEvent: false,
	loaded: false,
};

export default handleActions({
	[CREATE_EVENT_LOADING]: (state) => assign({}, state, {
		isCreatingEvent: true,
	}),

	[CREATE_EVENT_SUCCESS]: stopCreatingEvent,
	[CREATE_EVENT_ERROR]: stopCreatingEvent,

	[READ_EVENTS_LOADING]: (state) => assign({}, state, {
		isReadingEvents: true,
	}),

	[READ_EVENTS_SUCCESS]: (state, {payload}) => {
		console.log()
		return assign({}, state, {
			events: Object.keys(payload),
			eventsById: payload,
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
}, initialState);

function stopCreatingEvent(state) {
	return assign({}, state, {
		isCreatingEvent: false,
	});
}
