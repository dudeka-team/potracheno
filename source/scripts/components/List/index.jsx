import React from 'react';

export default function List(props) {
	return (
		<ul className="list">
			{props.children}
		</ul>
	);
}
