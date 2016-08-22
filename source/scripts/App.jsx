import React from 'react';
import {Link} from 'react-router';

export default function App(props) {
	return (
		<div className="root">
			<div>App header</div>
			<div>{props.children}</div>
			<div className="bottom-nav">
			    <Link to="/events">Events</Link>
				<Link to="/balance">Balance</Link>
				<Link to="/event">Event page</Link>
			</div>
		</div>
	);
}
