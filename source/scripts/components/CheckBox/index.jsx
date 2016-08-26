import React from 'react';
import shortid from 'shortid';

export default function Checkbox(props) {
	const id = shortid.generate();
	return (
		<div className="checkbox-wrapper">
			<input id={id} onClick={props.onClick} className="checkbox" type="checkbox" />
			<label className="checkbox-label" htmlFor={id} />
		</div>
	);
}
