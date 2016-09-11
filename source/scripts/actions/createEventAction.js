import {createAction} from 'redux-actions';
import db from '../database';
import {
	CREATE_EVENT_ACTION,
} from '../constants';

const space = '_s_';
const bold = 'b_';

export const eventActionTypes = {
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
		return {
			text: `${bold}${currentUser}${space}купил${space}${bold}${purchaseName}
			${space}на${space}сумму`,
			icon: 'purchase',
			date,
			purchasePrice,
		};
	},
	addParticipantToPurchase(currentUser, payerName, purchaseName, date) {
		let text;
		if (currentUser === payerName) {
			text = `${bold}${currentUser}${space}добавил
			${space}себя${space}в${space}покупку${space}${bold}${purchaseName}`;
		} else {
			text = `${bold}${currentUser}${space}добавил${space}${bold}${payerName}
			${space}в${space}покупку${space}${bold}${purchaseName}`;
		}
		return {
			text,
			icon: 'pen',
			date,
		};
	},
	removeParticipantToPurchase(currentUser, payerName, purchaseName, date) {
		let text;
		if (currentUser === payerName) {
			text = `${bold}${currentUser}${space}убрал${space}себя${space}из
			${space}покупки${space}${bold}${purchaseName}`;
		} else {
			text = `${bold}${currentUser}${space}убрал${space}${bold}${payerName}${space}из
			${space}покупки${space}${bold}${purchaseName}`;
		}
		return {
			text,
			icon: 'pen',
			date,
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
			}));
		});
	};
}
