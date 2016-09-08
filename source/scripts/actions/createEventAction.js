import {createAction} from 'redux-actions';
import {hashHistory} from 'react-router';
import db from '../database';
import {
	CREATE_EVENT_ACTION,
} from '../constants';

export const eventActionTypes = {
	eventCreation(eventName) {
		return `Мероприятие ${eventName} создано`;
	},
	joinToEvent(participantName) {
		return `К мероприятию присоединился ${participantName}`;
	},
	changeEventName(managerName, eventName, date) {
		return {
			text: `${managerName} изменил название мероприятия на ${eventName}`,
			icon: 'pen',
			date
		}
	},
	addParticipantToEvent(participantName, eventName) {
		return `${participantName} добавлен в мероприятие ${eventName}`;
	},
	participantGoOut(participantName, eventName) {
		return `${participantName} вышел из мероприятия ${eventName}`;
	},
	addPurchase(participantName, purchaseName, purchasePrice, date) {
		return {
			text: `${participantName} купил "${purchaseName}" на сумму ${purchasePrice} руб.`,
			icon: 'purchase',
			date
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
			hashHistory.push(`events/${payload.eventId}`);
		});
	};
}
