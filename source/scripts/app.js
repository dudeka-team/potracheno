import React from 'react';

import Wrapper from './components/wrapper';

export default function App(props) {
	return <Wrapper className="root">{props.children}</Wrapper>;
}
