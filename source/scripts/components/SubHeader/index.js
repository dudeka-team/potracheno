import React from 'react';

export default function SubHeader(props) {
	return (
		<div className="sub-header" {...props}>
			{props.text}
		</div>
	);
}
