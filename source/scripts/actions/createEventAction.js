import {createAction} from 'redux-actions';
import db from '../database';
import {
	CREATE_EVENT_ACTION,
} from '../constants';

export const eventActionTypes = {
	createEvent(managerName) {
		return `${managerName} создал мероприятие`;
	},
	joinToEvent(participantName) {
		return `К мероприятию присоединился ${participantName}`;
	},
	changeEventName(currentUser, eventName, date) {
		return {
			text: `${currentUser} изменил название мероприятия на ${eventName}`,
			icon: 'pen',
			date,
		};
	},
	changeEventDate(currentUser, start, end, date) {
		return {
			text: `${currentUser} изменил время мероприятия на ${start}-${end}`,
			icon: 'pen',
			date,
		};
	},
	addParticipantToEvent(currentUser, participantName, date) {
		return {
			text: `${currentUser} добавил в мероприятие ${participantName}`,
			icon: 'person',
			date,
		};
	},
	removeParticipantFromEvent(currentUser, participantName, date) {
		return {
			text: `${currentUser} исключил ${participantName} из мероприятия`,
			icon: 'exit',
			date,
		};
	},
	addPurchase(currentUser, purchaseName, purchasePrice, date) {
		return {
			text: `_b${currentUser} купил _b"${purchaseName}" на сумму _b${purchasePrice} руб.`,
			icon: 'purchase',
			date,
		};
	},
	changePurchaseInfo(participantName, purchaseName) {
		return `${participantName} изменил покупку "${purchaseName}"`;
	},
	noParticipateInPurchase(participantName, purchaseName) {
		return `${participantName} не участвует в покупке "${purchaseName}"`;
	},
	joinToPurchase(participantName, purchaseName) {
		return `${participantName} присоединился к покупке "${purchaseName}"`;
	},
	giveBackDebt(creditorName, debtorName) {
		return `${creditorName} вернул долг ${debtorName}`;
	},
	eventClosing(eventName) {
		return `Мероприятие ${eventName} подошло к концу`;
	},
};

export const createEventAction = createAction(CREATE_EVENT_ACTION);

export function createEventActionAsync(payload) {
	return dispatch => {
		db.addEventAction(payload.eventId, payload.eventActionInfo).then(result => {
			dispatch(createEventAction({
				key: result.key,
				eventActionInfo: result.eventActionInfo,
			}));
		});
	};
}
