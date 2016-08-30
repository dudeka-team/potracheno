import React from 'react';
import {Link} from 'react-router';
import {TopBar, TopBarHeading, TopBarIcon} from './components/TopBar';


export default function App(props) {
	const {pathname} = props.location;
	return (
		<div className="root">
			{pathname.match(/^\/event\/\d*\/?$/) && <EventPageTopBar />}
			<div>{props.children}</div>
			<div className="bottom-nav" style={{marginTop: '15rem'}}>
				<Link to="/events">Events</Link>
				<Link to="/event">Event page</Link>
				<Link to="/newpurchase">New purchase</Link>
				<Link to="/purchase">Purchase page</Link>
				<Link to="/demo">Demo page</Link>
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
