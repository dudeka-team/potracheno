import { CHANGE_CURRENT_EVENT } from '../constants';

export default function changeCurrentEvent(payload) {
	return {
		type: CHANGE_CURRENT_EVENT,
		payload,
	};
}
