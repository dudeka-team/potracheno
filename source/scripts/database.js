import firebase from 'firebase';

const Database = {};

Database.saveEvent = function saveEvent(data) {
	return firebase
		.database()
		.ref('events')
		.push(data)
		.then((snapshot) => {
			return ({
				key: snapshot.key,
				eventInfo: data,
			});
		});
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
}

export default Database;
