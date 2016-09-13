import React from 'react';

export default function UserSelectionListItem(props) {
	return (
		<div className="user-selection-list-item" onClick={props.onClick}>{props.text}</div>
	);
}
