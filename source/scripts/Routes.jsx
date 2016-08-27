import React from 'react';
import {Router, Route, IndexRedirect} from 'react-router';
import App from './App';
import EventsPage from './pages/EventsPage';
import NewEventPage from './pages/NewEvent';
import BalancePage from './pages/BalancePage';
import EventPage from './pages/EventPage';
import PurchasePage from './pages/PurchasePage';
import NewPurchasePage from './pages/NewPurchasePage';
import PayersPage from './pages/PayersPage';
import DemoPage from './pages/DemoPage';

export default function Routes(props) {
	return (
		<Router history={props.history}>
			<Route path="/" component={App}>
				<IndexRedirect to="events" />
				<Route path="events" component={EventsPage} />
				<Route path="events/new" component={NewEventPage} />
				<Route path="balance" component={BalancePage} />
				<Route path="event" component={EventPage} />
				<Route path="purchase" component={PurchasePage} />
				<Route path="newpurchase" component={NewPurchasePage} />
				<Route path="payers" component={PayersPage} />
				<Route path="demo" component={DemoPage} />
			</Route>
		</Router>
	);
}
