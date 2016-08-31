import React from 'react';
import {Link} from 'react-router';

import Wrapper from './components/Wrapper';


export default function App(props) {
	return (
		<Wrapper className="root">
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
