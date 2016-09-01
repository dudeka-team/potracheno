import React from 'react';

import Wrapper from './components/Wrapper';


export default function App(props) {
	return (
		<Wrapper className="root">
			{props.children}
		</Wrapper>
	);
}
