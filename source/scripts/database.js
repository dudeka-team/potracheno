import firebase from 'firebase';

const Database = {};

Database.saveEvent = (data) => {
	return firebase
		.database()
		.ref('events')
		.push(data)
		.then(result => ({
			key: result.key,
			eventInfo: data,
		}));
};

export default Database;
