import {handleActions} from 'redux-actions';

import {
	CREATE_EVENT_LOADING,
	CREATE_EVENT_SUCCESS,
	CREATE_EVENT_ERROR,
	READ_EVENTS_LOADING,
	READ_EVENTS_SUCCESS,
	READ_EVENTS_ERROR,
} from '../constants';


const {assign} = Object;
const initialState = {
	events: [],
	eventsById: {},
	currentEvent: null,
	isCreatingEvent: false,
	isReadingEvents: false,
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
		return assign({}, state, {
			events: Object.keys(payload),
			eventsById: payload,
			isReadingEvents: false,
		});
	},

	[READ_EVENTS_ERROR]: (state) => assign({}, state, {
		isReadingEvents: false,
	}),
}, initialState);

function stopCreatingEvent(state) {
	return assign({}, state, {
		isCreatingEvent: false,
	});
}
