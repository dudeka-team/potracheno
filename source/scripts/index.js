import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './root';

const firebaseConfig = {
	apiKey: 'AIzaSyCRj3swJ1wBa7lwHKD_B-SYnKCQh_zl-4Q',
	authDomain: 'dudeka-401e8.firebaseapp.com',
	databaseURL: 'https://dudeka-401e8.firebaseio.com',
	storageBucket: 'dudeka-401e8.appspot.com',
};

injectTapEventPlugin();
dayjs.locale('ru');
dayjs.extend(relativeTime);
firebase.initializeApp(firebaseConfig);

if (typeof localStorage === 'object') {
	try {
		localStorage.setItem('localStorage', 1);
		localStorage.removeItem('localStorage');
	} catch (e) {
		// eslint-disable-next-line no-alert
		alert('Выйдите из приватного режима, иначе приложение не будет работать');
	}
}

ReactDOM.render(<Root />, document.querySelector('#app'));
