import {browserHistory} from 'react-router';
import db from '../database';
import {
	FETCH_PURCHASE_DELETE,
} from '../constants';

export default function fetchPurchaseDelete(eventId, purchaseId) {
	return {
		type: FETCH_PURCHASE_DELETE,
		payload: new Promise((resolve, reject) => {
			db
				.deletePurchase(eventId, purchaseId)
				.then(resolve)
				.then(() => browserHistory.push(`events/${eventId}`))
				.catch(reject);
		}),
	};
}
