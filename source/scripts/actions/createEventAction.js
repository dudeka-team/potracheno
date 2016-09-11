import {createAction} from 'redux-actions';
import db from '../database';
import {
	CREATE_EVENT_ACTION,
} from '../constants';

const space = '_s_';
const bold = 'b_';

export const eventActionTypes = {
	createEvent(managerName) {
		return `_b${managerName} создал мероприятие`;
	},
	joinToEvent(participantName) {
		return `К мероприятию присоединился _b${participantName}`;
	},
	changeEventName(currentUser, eventName, date) {
		return {
			text: `${bold}${currentUser}${space}
			изменил${space}название${space}мероприятия
			${space}на${space}${bold}${eventName}`,
			icon: 'pen',
			date,
		};
	},
	changeEventDate(currentUser, start, end, date) {
		return {
			text: `${bold}${currentUser}${space}изменил
			${space}время${space}мероприятия${space}
			на${space}${bold}${start}-${end}`,
			icon: 'pen',
			date,
		};
	},
	addParticipantToEvent(currentUser, participantName, date) {
		return {
			text: `${bold}${currentUser}${space}добавил${space}
			в${space}мероприятие${space}${bold}${participantName}`,
			icon: 'person',
			date,
		};
	},
	removeParticipantFromEvent(currentUser, participantName, date) {
		return {
			text: `${bold}${currentUser}${space}исключил${space}${bold}${participantName}
			${space}из мероприятия`,
			icon: 'exit',
			date,
		};
	},
	addPurchase(currentUser, purchaseName, purchasePrice, date) {
		console.log(date)
		return {
			text: `${bold}${currentUser}${space}купил${space}${bold}${purchaseName}
			${space}на${space}сумму`,
			icon: 'purchase',
			date,
			purchasePrice
		};
	},
	changePurchaseInfo(participantName, purchaseName) {
		return `${participantName} изменил покупку ${purchaseName}`;
	},
	noParticipateInPurchase(participantName, purchaseName) {
		return `${participantName} не участвует в покупке ${purchaseName}`;
	},
	joinToPurchase(participantName, purchaseName) {
		return `${participantName} присоединился к покупке ${purchaseName}`;
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
			console.log(result.eventActionInfo)
			dispatch(createEventAction({
				key: result.key,
				eventActionInfo: result.eventActionInfo,
			}));
		});
	};
}
