import {createAction} from 'redux-actions';
import db from '../database';
import {
	CREATE_PURCHASE,
} from '../constants';

export const createPurchase = createAction(CREATE_PURCHASE);

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
