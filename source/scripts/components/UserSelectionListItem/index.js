import React from 'react';

export default function UserSelectionListItem(props) {
	return (
		<div onClick={props.onClick}>{props.text}</div>
	);
}
