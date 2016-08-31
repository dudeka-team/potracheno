import {hashHistory} from 'react-router';
import firebase from 'firebase';
import db from '../database';
import {
	CREATE_PURCHASE,
} from '../constants';

function createPurchase(payload) {
	return {
		type: CREATE_PURCHASE,
		payload,
	};
}

export function createPurchaseAsync(payload) {
	return dispatch => {
		db.addPurchase(payload.eventId, payload.purchaseData).then(result => {
			dispatch(createPurchase({
				key: result.key,
				purchaseData: result.purchaseData,
			}));
		});
	};
}
