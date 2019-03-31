import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import browserHistory from 'react-router/lib/browserHistory';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import reducers from './reducers';

export const store = createStore(
	combineReducers(reducers),
	compose(
		applyMiddleware(
			thunk,
			routerMiddleware(browserHistory),
			promiseMiddleware({
				promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'],
			})
		),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);
