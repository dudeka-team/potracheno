import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'react-fastclick';

import {appReducer} from './reducers/app';
import Routes from './Routes';

injectTapEventPlugin();
moment.locale('ru');

const store = createStore(
	combineReducers({
		app: appReducer,
		routing: routerReducer,
	}),
	window.devToolsExtension && window.devToolsExtension()
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
