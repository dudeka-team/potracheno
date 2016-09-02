import {handleActions} from 'redux-actions';

const initialState = {
	events: [],
	eventsById: {},
	currentEvent: null,
	isCreatingEvent: false,
	eventsLoaded: false,
};

export default handleActions({

}, initialState);
