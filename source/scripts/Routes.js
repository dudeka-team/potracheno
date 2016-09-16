import React from 'react';
import {Router, Route, IndexRedirect} from 'react-router';

import App from './App';
import EventsPage from './pages/EventsPage';

import EventPreloadingPage from './pages/EventPreloadingPage';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';

import PurchasePage from './pages/PurchasePage';


export default function Routes(props) {
	return (
		<Router history={props.history}>
			<Route path="/" component={App}>
				<IndexRedirect to="events" />
				<Route path="events" component={EventsPage} />
				<Route path="events/new" component={NewEventPage} />
				<Route path="events/:id" component={EventPreloadingPage} />
				<Route path="events/:id/edit" component={EditEventPage} />
				<Route path="events/:id/purchases/new" component={PurchasePage} />
				<Route path="events/:id/purchases/:purchase_id" component={PurchasePage} />
			</Route>
		</Router>
	);
}
