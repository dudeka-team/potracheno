import {routerReducer} from 'react-router-redux';
import app from './app';
import events from './events';

export default {
	app,
	events,
	routing: routerReducer,
};
