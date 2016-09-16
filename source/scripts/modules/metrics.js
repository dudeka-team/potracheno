export const CREATE_EVENT = 'CREATE_EVENT';
export const CREATE_FIRST_PURCHASE = 'CREATE_FIRST_PURCHASE';
export const CREATE_EVENT_INVITED = 'CREATE_EVENT_INVITED';

export const INDEPENDENT = 'INDEPENDENT';
export const INVITED = 'INVITED';

const validTypes = [INDEPENDENT, INVITED];


export function getUserType() {
	return localStorage.getItem('userType');
}

export function setUserType(type) {
	if (validTypes.indexOf(type) === -1) {
		throw new RangeError(`user type must be one of [${validTypes.join(', ')}]`);
	}

	localStorage.setItem('userType', type);
	return type;
}

export function hasCreatedPurchase() {
	return localStorage.getItem('created_purchase');
}

export function markPurchaseCreation() {
	localStorage.setItem('created_purchase', 1);
}

export function reachGoal(type) {
	window.yaCounter.reachGoal(type);
}
