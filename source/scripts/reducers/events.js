import { handleActions } from 'redux-actions';

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
	CREATE_EVENT_ACTION,
	OPEN_SHARE_LINK_POPUP,
	CLOSE_SHARE_LINK_POPUP,
} from '../constants';

const initialState = {
	events: [],
	eventsById: {},
	localEvents: {},
	currentEvent: null,
	currentUserName: null,
	showShareLinkPopup: false,
	isCreatingEvent: false,
	isFetchingEvent: false,
	isFetchingEvents: false,
};

export default handleActions(
	{
		[FETCH_EVENT_DATA_LOADING]: state => ({ ...state, isFetchingEvent: true }),

		[FETCH_EVENT_DATA_ERROR]: state => ({ ...state, isFetchingEvent: false }),

		[FETCH_EVENT_DATA_SUCCESS]: (state, { payload }) => ({
			...state,
			eventsById: {
				...state.eventsById,
				[payload.key]: payload.value,
			},
			currentEvent: { ...payload.value },
			currentUserName: state.localEvents[payload.key],
			isFetchingEvent: false,
		}),

		[CREATE_EVENT_LOADING]: state => ({
			...state,
			isCreatingEvent: true,
		}),

		[CREATE_EVENT_SUCCESS]: stopCreatingEvent,
		[CREATE_EVENT_ERROR]: stopCreatingEvent,

		[READ_EVENTS_LOADING]: state => ({
			...state,
			isFetchingEvents: true,
		}),

		[READ_EVENTS_SUCCESS]: (state, { payload }) => ({
			...state,
			events: Object.keys(payload),
			eventsById: payload,
			isFetchingEvents: false,
		}),

		[READ_EVENTS_ERROR]: state => ({
			...state,
			isFetchingEvents: false,
		}),
		[CHANGE_CURRENT_EVENT]: (state, { payload }) => ({
			...state,
			currentEvent: state.eventsById[payload],
		}),

		[CREATE_PURCHASE]: (state, { payload }) => {
			const currentEvent = { ...state.currentEvent };
			currentEvent.purchases = {
				...currentEvent.purchases,
				[payload.key]: payload.purchaseData,
			};
			return {
				...state,
				currentEvent,
				eventsById: {
					...state.eventsById,
					[currentEvent.id]: currentEvent,
				},
			};
		},

		[CREATE_EVENT_ACTION]: (state, { payload }) => {
			const currentEvent = {
				...state.currentEvent,
				actions: {
					...state.currentEvent.actions,
					[payload.key]: payload.eventActionInfo,
				},
			};

			return {
				...state,
				currentEvent,
				eventsById: {
					...state.eventsById,
					[payload.eventId]: currentEvent,
				},
			};
		},

		[GET_LOCAL_EVENTS]: (state, { payload }) => ({
			...state,
			localEvents: payload,
		}),

		[SET_LOCAL_EVENTS]: (state, { payload }) => ({
			...state,
			localEvents: payload,
		}),

		[CHANGE_PURCHASE]: (state, { payload }) => {
			const { eventId, purchase } = payload;
			const { eventsById } = state;
			const participants = purchase.participants.slice();
			const changedPurchase = { ...purchase, participants };

			const changedEvents = {
				...eventsById,
				[eventId]: {
					...eventsById[eventId],
					purchases: {
						...eventsById[eventId].purchases,
						changedPurchase,
					},
				},
			};

			return {
				...state,
				eventsById: { ...eventsById, ...changedEvents },
			};
		},

		[REPAY_DEBT_SUCCESS]: (state, { payload }) => {
			const { eventId, sum, name } = payload;

			const updatedEvent = {
				...state.eventsById[eventId],
				repayedDebts: {
					...state.eventsById[eventId].repayedDebts,
					[name]: sum,
				},
			};

			return {
				...state,
				eventsById: {
					...state.eventsById,
					[eventId]: updatedEvent,
				},
				currentEvent: updatedEvent,
			};
		},

		[FETCH_PURCHASE_DELETE]: (state, { payload }) => {
			const { eventId, purchaseId } = payload;
			const { eventsById } = state;

			const purchases = { ...eventsById[eventId].purchases };
			delete purchases[purchaseId];

			return {
				...state,
				eventsById: {
					...eventsById,
					[eventId]: { ...eventsById[eventId], ...purchases },
				},
			};
		},

		[FETCH_UPDATE_PARTICIPANTS_SUCCESS]: (state, { payload }) => {
			const { eventId, participantsList } = payload;
			const { eventsById } = state;
			const changedEvent = {
				...eventsById[eventId],
				participants: participantsList,
			};
			return {
				...state,
				eventsById: {
					...eventsById,
					[eventId]: changedEvent,
				},
				currentEvent: changedEvent,
			};
		},

		[OPEN_SHARE_LINK_POPUP]: state => ({
			...state,
			shareLinkPopupOpened: true,
		}),
		[CLOSE_SHARE_LINK_POPUP]: state => ({
			...state,
			shareLinkPopupOpened: false,
		}),
	},
	initialState
);

function stopCreatingEvent(state) {
	return {
		...state,
		isCreatingEvent: false,
		currentEvent: null,
	};
}
