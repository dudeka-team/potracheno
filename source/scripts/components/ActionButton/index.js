import React from 'react';

export default function ActionButton(props) {
	return (
		<div className="action-button" onClick={props.onClick}>
			<div className="action-button__text">{props.text}</div>
		</div>
	);
}
