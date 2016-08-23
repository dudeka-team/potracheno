import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import appReducer from './reducers/app';
import Routes from './Routes';

const store = createStore(
	combineReducers({
		app: appReducer,
		routing: routerReducer,
	}),
	window.devToolsExtension && window.devToolsExtension()
);

const history = syncHistoryWithStore(hashHistory, store);

document.addEventListener('DOMContentLoaded', onDeviceReady);

function onDeviceReady() {
	ReactDOM.render(<AppRoot />, document.querySelector('#app'));
}

function AppRoot() {
	return (
		<Provider store={store}>
			<Routes history={history} />
		</Provider>
	);
}
