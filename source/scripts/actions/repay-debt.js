import db from '../database';
import {
	REPAY_DEBT,
} from '../constants';

export default function repayDebt(eventId, sum, fromUser, toUser, oldSumFrom, oldSumTo) {
	const sumFrom = sum + (oldSumFrom || 0);
	const sumTo = -sum + (oldSumTo || 0);

	return dispatch => {
		dispatch({
			type: REPAY_DEBT,
			payload: new Promise((resolve, reject) => {
				db
					.repayDebt(eventId, sumFrom, fromUser)
					.then(resolve)
					.catch(reject);
			}),
		});
		dispatch({
			type: REPAY_DEBT,
			payload: new Promise((resolve, reject) => {
				db
					.repayDebt(eventId, sumTo, toUser)
					.then(resolve)
					.catch(reject);
			}),
		});
	};
}
