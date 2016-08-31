import React from 'react';
import {Link} from 'react-router';
import {TopBar, TopBarHeading, TopBarIcon} from './components/TopBar';


export default function App(props) {
	const {pathname} = props.location;
	return (
		<div className="root">
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
