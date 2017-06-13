import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import browserHistory from 'react-router/lib/browserHistory';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';

import 'react-fastclick';

import store from './store';
import Routes from './Routes';

const firebaseConfig = {
	apiKey: 'AIzaSyCRj3swJ1wBa7lwHKD_B-SYnKCQh_zl-4Q',
	authDomain: 'dudeka-401e8.firebaseapp.com',
	databaseURL: 'https://dudeka-401e8.firebaseio.com',
	storageBucket: 'dudeka-401e8.appspot.com',
};

const accentColor = '#ffe151';
const accentDarkColor = '#f7cc00';
const dudekaTheme = getMuiTheme({
	datePicker: {
		color: accentDarkColor,
		textColor: '#333',
		selectColor: accentColor,
		selectTextColor: '#fff',
	},
	flatButton: {
		textColor: '#3f95ff',
		primaryTextColor: '#3f95ff',
	},
});

injectTapEventPlugin();
moment.locale('ru');
firebase.initializeApp(firebaseConfig);

function AppRoot() {
	return (
		<MuiThemeProvider muiTheme={dudekaTheme}>
			<Provider store={store}>
				<Routes history={syncHistoryWithStore(browserHistory, store)} />
			</Provider>
		</MuiThemeProvider>
	);
}

function onDOMContentLoaded() {
	ReactDOM.render(<AppRoot />, document.querySelector('#app'));
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

if (typeof localStorage === 'object') {
	try {
		localStorage.setItem('localStorage', 1);
		localStorage.removeItem('localStorage');
	} catch (e) {
		// eslint-disable-next-line no-alert
		alert('Выйдите из приватного режима, иначе приложение не будет работать');
	}
}
