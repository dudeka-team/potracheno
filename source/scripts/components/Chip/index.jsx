import React from 'react';

export default function Chip(props) {
	return (
		<div className="chip">
			<p className="chip__text">{props.name}</p>
			<div className="chip__cancel-button" />
		</div>
	);
}
