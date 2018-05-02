import { createAction } from 'redux-actions';
import db from '../database';
import {
	SAVE_FEEDBACK,
} from '../constants';

export const saveFeedback = createAction(SAVE_FEEDBACK);

export function saveFeedbackAsync(data) {
	return dispatch => {
		db.saveFeedback(data).then(result => {
			dispatch(saveFeedback({
				mail: result.mail,
				problem: result.problem,
			}));
		});
	};
}

