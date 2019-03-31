import React from 'react';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import Redirect from 'react-router/lib/Redirect';

import App from './app';
import { EventsPage } from './pages/events';
import { FeedbackPage } from './pages/feedback';
import { NewEventPage } from './pages/new-event';

import EventPreloadingPage from './pages/event-preloading-page';
import EditEventPage from './pages/edit-event-page';
import PurchasePage from './pages/purchase-page';

export function Routes(props) {
	return (
		<Router history={props.history}>
			<Route path="/" component={App}>
				<IndexRedirect to="events" />
				<Route path="events" component={EventsPage} />
				<Route path="events/new" component={NewEventPage} />
				<Route path="events/:id" component={EventPreloadingPage} />
				<Route path="events/:id/edit" component={EditEventPage} />
				<Route path="events/:id/purchases/new" component={PurchasePage} />
				<Route
					path="events/:id/purchases/:purchase_id"
					component={PurchasePage}
				/>
				<Route path="feedback" component={FeedbackPage} />
				<Redirect path="*" to="events" />
			</Route>
		</Router>
	);
}
