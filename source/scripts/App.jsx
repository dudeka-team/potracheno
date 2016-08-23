import React from 'react';
import {Link} from 'react-router';
import {TopBar, TopBarHeading, TopBarIcon} from './components/TopBar';


export default function App(props) {
	return (
		<div className="root">
			<TopBar>
				<TopBarIcon icon="burger" />
				<TopBarHeading title="Пикник на обочине" subtitle="5 участников" />
				<TopBarIcon icon="add" />
			</TopBar>
			<div>{props.children}</div>
			<div className="bottom-nav">
				<Link to="/events">Events</Link>
				<Link to="/balance">Balance</Link>
				<Link to="/event">Event page</Link>
			</div>
		</div>
	);
}
