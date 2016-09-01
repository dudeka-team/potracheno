import {handleActions} from 'redux-actions';
import {
	LOAD_EVENT_DATA,
	CREATE_PURCHASE,
} from '../constants';

const initialState = {
	events: [],
	eventsById: {},
	currentEvent: null,
	isCreatingEvent: false,
	eventsLoaded: false,
};

export default handleActions({
	[LOAD_EVENT_DATA]: (state, {payload}) => {
		return Object.assign({}, state, {
			eventsById: Object.assign({}, state.eventsById, {
				[payload.key]: payload.value,
			}),
			currentEvent: payload.value,
		});
	},

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
