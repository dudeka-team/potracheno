import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import {hashHistory} from 'react-router';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
import assign from 'es6-object-assign';

import 'react-fastclick';

import reducers from './reducers';
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
		selectColor: accentColor,
		selectTextColor: '#fff',
	},
	flatButton: {
		primaryTextColor: '#333',
	},
});

injectTapEventPlugin();
moment.locale('ru');
assign.polyfill();
firebase.initializeApp(firebaseConfig);

const store = createStore(
	combineReducers(reducers),
	compose(
		applyMiddleware(
			thunk,
			promiseMiddleware({
				promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'],
			})
		),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

function AppRoot() {
	return (
		<MuiThemeProvider muiTheme={dudekaTheme}>
			<Provider store={store}>
				<Routes history={syncHistoryWithStore(hashHistory, store)} />
			</Provider>
		</MuiThemeProvider>
	);
}

function onDOMContentLoaded() {
	ReactDOM.render(<AppRoot />, document.querySelector('#app'));
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
