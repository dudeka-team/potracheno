import {hashHistory} from 'react-router';
import db from '../database';
import {
	CHANGE_PURCHASE,
} from '../constants';

export default function fetchPurchaseChange(eventId, purchaseId, purchase) {
	return {
		type: CHANGE_PURCHASE,
		payload: new Promise((resolve, reject) => {
			db
				.changePurchase(eventId, purchaseId, purchase)
				.then(() => {
					hashHistory.push(`events/${eventId}`);
				})
				.then(resolve)
				.catch(reject);
		}),
	};
}
