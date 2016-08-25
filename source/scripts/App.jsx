import React from 'react';
import {Link} from 'react-router';
import {TopBar, TopBarHeading, TopBarIcon} from './components/TopBar';


export default function App(props) {
	const {pathname} = props.location;
	return (
		<div className="root">
			{pathname.match(/^\/event\/\d*\/?$/) && <EventPageTopBar />}
			{pathname.match(/^\/event\/\d*\/purchase\/new\/?$/) && <NewPurchaseTopBar />}
			<div>{props.children}</div>
			<div className="bottom-nav" style={{marginTop: '15rem'}}>
				<Link to="/events">Events</Link>
				<Link to="/balance">Balance</Link>
				<Link to="/event">Event page</Link>
				<Link to="/purchase">Purchase page</Link>
			</div>
		</div>
	);
}

function EventPageTopBar() {
	return (
		<TopBar>
			<TopBarIcon icon="arrow-back" />
			<TopBarHeading title="Пикник на обочине" subtitle="5 участников • 12 апреля" />
			<TopBarIcon icon="add-person" />
			<TopBarIcon icon="info" />
		</TopBar>
	);
}

function NewPurchaseTopBar() {
	return (
		<TopBar>
			<TopBarIcon icon="arrow-back" />
			<TopBarHeading title="Новая покупка" />
			<TopBarIcon icon="check-active" />
		</TopBar>
	);
}
