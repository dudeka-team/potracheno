import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import {hashHistory} from 'react-router';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import assign from 'es6-object-assign';

import 'react-fastclick';

import appReducer from './reducers/app';
import Routes from './Routes';


injectTapEventPlugin();
moment.locale('ru');
assign.polyfill();

const firebaseConfig = {
	apiKey: 'AIzaSyCRj3swJ1wBa7lwHKD_B-SYnKCQh_zl-4Q',
	authDomain: 'dudeka-401e8.firebaseapp.com',
	databaseURL: 'https://dudeka-401e8.firebaseio.com',
	storageBucket: 'dudeka-401e8.appspot.com',
};

firebase.initializeApp(firebaseConfig);

const store = createStore(
	combineReducers({
		app: appReducer,
		routing: routerReducer,
	}),
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension && window.devToolsExtension()
	)
);

// eslint-disable-next-line import/prefer-default-export
export const history = syncHistoryWithStore(hashHistory, store);

document.addEventListener('DOMContentLoaded', onDeviceReady);

function onDeviceReady() {
	ReactDOM.render(<AppRoot />, document.querySelector('#app'));
}

function AppRoot() {
	return (
		<MuiThemeProvider>
			<Provider store={store}>
				<Routes history={history} />
			</Provider>
		</MuiThemeProvider>
	);
}
