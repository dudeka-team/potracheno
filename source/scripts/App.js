import React from 'react';
import {Link} from 'react-router';

import Wrapper from './components/Wrapper';
import {TopBar, TopBarHeading, TopBarIcon} from './components/TopBar';


export default function App(props) {
	const {pathname} = props.location;
	return (
		<Wrapper className="root">
			{pathname.match(/^\/event\/\d*\/?$/) && <EventPageTopBar />}
			<Wrapper>{props.children}</Wrapper>
			<div className="bottom-nav" style={{marginTop: '15rem'}}>
				<Link to="/events">Events</Link>{' '}
				<Link to="/events/-KQR3rTvOIdgNi7r2-5T">Event</Link>{' '}
				<Link to="/newpurchase">New purchase</Link>{' '}
				<Link to="/purchase">Purchase page</Link>{' '}
				<Link to="/demo">Demo page</Link>{' '}
			</div>
		</Wrapper>
	);
}
