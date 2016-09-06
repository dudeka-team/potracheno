import React from 'react';
import {Router, Route, IndexRedirect} from 'react-router';

import App from './App';
import EventsPage from './pages/EventsPage';

import EventPage from './pages/EventPage';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';

import PurchasePage from './pages/PurchasePage';
import NewPurchasePage from './pages/NewPurchasePage';

import DemoPage from './pages/DemoPage';

export default function Routes(props) {
	return (
		<Router history={props.history}>
			<Route path="/" component={App}>
				<IndexRedirect to="events" />
				<Route path="events" component={EventsPage} />
				<Route path="events/new" component={NewEventPage} />
				<Route path="events/:id" component={EventPage} />
				<Route path="events/:id/edit" component={EditEventPage} />
				<Route path="events/:id/purchases/new" component={NewPurchasePage} />
				<Route path="events/:id/purchases/:purchase_id" component={PurchasePage} />
				<Route path="demo" component={DemoPage} />
			</Route>
		</Router>
	);
}
