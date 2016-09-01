import {handleActions} from 'redux-actions';
import {
	LOAD_EVENT_DATA,
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
}, initialState);
