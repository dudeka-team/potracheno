import {createAction} from 'redux-actions';
import db from '../database';
import {
	CREATE_EVENT_ACTION,
} from '../constants';

export const getDiff = (oldPs, newPs) => {
	let removed = [];
	let added = [];
	added = newPs.filter((newP) => {
		return oldPs.indexOf((newP) === -1);
	});

	removed = oldPs.filter((oldP) => {
		return newPs.indexOf((oldP) === -1);
	});

	return {
		added,
		removed,
	};
};

export const eventActionTypes = {
	changeEventName(currentUser, eventName, date) {
		return {
			currentUser,
			eventName,
			icon: 'pen',
			date,
			actionType: 'changeEventName',
		};
	},
	changeEventDate(currentUser, start, end, date) {
		return {
			currentUser,
			start,
			end,
			icon: 'pen',
			date,
			actionType: 'changeEventDate',
		};
	},
	addParticipantToEvent(currentUser, participantName, date) {
		return {
			currentUser,
			participantName,
			icon: 'person',
			date,
			actionType: 'addParticipantToEvent',
		};
	},
	removeParticipantFromEvent(currentUser, participantName, date) {
		return {
			currentUser,
			participantName,
			icon: 'exit',
			date,
			actionType: 'removeParticipantFromEvent',
		};
	},
	addPurchase(currentUser, purchaseName, sum, date) {
		return {
			currentUser,
			purchaseName,
			sum,
			icon: 'purchase',
			date,
			actionType: 'addPurchase',
		};
	},
	deletePurchase(currentUser, purchaseName, date) {
		return {
			currentUser,
			purchaseName,
			icon: 'pen',
			date,
			actionType: 'deletePurchase',
		};
	},
	addParticipantToPurchase(currentUser, payerName, purchaseName, date) {
		return {
			currentUser,
			payerName,
			purchaseName,
			icon: 'pen',
			date,
			actionType: 'addParticipantToPurchase',
		};
	},
	removeParticipantFromPurchase(currentUser, payerName, purchaseName, date) {
		return {
			currentUser,
			payerName,
			purchaseName,
			icon: 'pen',
			date,
			actionType: 'removeParticipantFromPurchase',
		};
	},
	giveBackPartially(currentUser, payerName, debtSum, date) {
		return {
			currentUser,
			payerName,
			debtSum,
			icon: 'check-active',
			date,
			actionType: 'giveBackPartially',
		};
	},
	giveBack(currentUser, payerName, debtSum, date) {
		return {
			currentUser,
			payerName,
			debtSum,
			icon: 'check-active-yellow',
			date,
			actionType: 'giveBack',
		};
	},
};

export const createEventAction = createAction(CREATE_EVENT_ACTION);

export function createEventActionAsync(payload) {
	return dispatch => {
		db.addEventAction(payload.eventId, payload.eventActionInfo).then(result => {
			dispatch(createEventAction({
				key: result.key,
				eventActionInfo: result.eventActionInfo,
				eventId: payload.eventId,
			}));
		});
	};
}
