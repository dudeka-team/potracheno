import firebase from 'firebase';

const Database = {};

Database.getFromDb = function(ref, val) {
	return firebase.database().ref(ref).once(val);
}

Database.saveToDb = function(ref, data) {
	return firebase.database().ref(ref).push(data);
}

export default Database;
