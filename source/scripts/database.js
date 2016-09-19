import firebase from 'firebase';

const Database = {};

Database.getLocalEvents = function getLocalEvents() {
	let result;

	try {
		result = JSON.parse(localStorage.getItem('localEvents') || '{}');
	} catch (e) {
		console.error(e); // eslint-disable-line no-console
		result = {};
	}

	return result;
};

Database.readEvents = function readEvents() {
	const localEvents = Database.getLocalEvents();
	const result = {};
	return new
		Promise((resolve, reject) => {
			Promise.all(
				Object
					.keys(localEvents)
					.map(eventId => {
						return firebase
							.database()
							.ref(`events/${eventId}`)
							.once('value')
							.then((snapshot) => {
								if (snapshot.val()) {
									result[eventId] = snapshot.val() || {};
								}
							});
					})
			)
			.then(() => resolve(result))
			.catch(reject);
		});
};

Database.saveEvent = function saveEvent(data) {
	return firebase
		.database()
		.ref('events')
		.push(data)
		.then((snapshot) => ({
			key: snapshot.key,
			eventInfo: data,
		}));
};

Database.updateEvent = function updateEvent(payload) {
	const {id, data} = payload;
	return firebase
		.database()
		.ref(`events/${id}`)
		.set(data)
		.then(() => payload);
};

Database.loadEvent = function loadEvent(eventId) {
	return firebase
		.database()
		.ref(`/events/${eventId}`)
		.once('value')
		.then((snapshot) => ({
			key: snapshot.key,
			value: snapshot.val(),
		}));
};

Database.addPurchase = function addPurchase(eventId, data) {
	return firebase
		.database()
		.ref(`events/${eventId}/purchases`)
		.push(data)
		.then(result => ({
			key: result.key,
			purchaseData: data,
		}));
};

Database.addEventAction = function addEventAction(eventId, data) {
	return firebase
		.database()
		.ref(`events/${eventId}/actions`)
		.push(data)
		.then((snapshot) => ({
			key: snapshot.key,
			eventActionInfo: data,
		}));
};

Database.changePurchase = function changePurchase(eventId, purchaseId, purchase) {
	return firebase
		.database()
		.ref(`events/${eventId}/purchases/${purchaseId}`)
		.set(purchase)
		.then(() => ({
			eventId,
			purchaseId,
			purchase,
		}));
};

Database.repayDebt = function repayDebt(eventId, sum, name) {
	return firebase
		.database()
		.ref(`events/${eventId}/repayedDebts/${name}`)
		.set(sum)
		.then(() => ({
			eventId,
			sum,
			name,
		}));
};

Database.deletePurchase = function deletePurchase(eventId, purchaseId) {
	return firebase
		.database()
		.ref(`events/${eventId}/purchases/${purchaseId}`)
		.remove()
		.then(() => ({
			eventId,
			purchaseId,
		}));
};

Database.fetchUpdateParticipants = function fetchUpdateParticipants(eventId, participantsList) {
	return firebase
		.database()
		.ref(`events/${eventId}/participants`)
		.set(participantsList)
		.then(() => ({
			eventId,
			participantsList,
		}));
};

Database.saveFeedback = function saveFeedback(data) {
	return firebase
		.database()
		.ref('feedbacks')
		.push(data)
		.then(() => ({
			data,
		}));
};

export default Database;
