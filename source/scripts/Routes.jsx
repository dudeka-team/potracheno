import React from 'react';
import {Router, Route, IndexRedirect} from 'react-router';
import App from './App';
import EventsPage from './pages/EventsPage';
import BalancePage from './pages/BalancePage';
import EventPage from './pages/EventPage';
import PurchasePage from './pages/PurchasePage';
import NewPurchase from './pages/NewPurchasePage';

export default function Routes(props) {
	return (
		<Router history={props.history}>
			<Route path="/" component={App}>
				<IndexRedirect to="events" />
				<Route path="events" component={EventsPage} />
				<Route path="balance" component={BalancePage} />
				<Route path="event" component={EventPage} />
				<Route path="purchase" component={PurchasePage} />
				<Route path="newpurchase" component={NewPurchase} />
			</Route>
		</Router>
	);
}
