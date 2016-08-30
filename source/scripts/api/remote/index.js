import firebase from 'firebase';

const Database = {};

Database.saveEvent = function(data) {
	return firebase
		.database()
		.ref('events')
		.push(data)
		.then(res => ({
			key: res.key,
			eventInfo: data,
		}));
}

export default Database;
