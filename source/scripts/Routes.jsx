import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import App from './App';
import EventsPage from './pages/EventsPage';
import BalancePage from './pages/BalancePage';
import EventPage from './pages/EventPage';

export default function Routes() {
	return (
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<Route path="events" component={EventsPage} />
				<Route path="balance" component={BalancePage} />
				<Route path="event" component={EventPage} />
			</Route>
		</Router>
	);
}
