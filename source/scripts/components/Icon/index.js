import React from 'react';

export default function Icon(props) {
	const baseClass = 'icon';
	return (
		<div className="icon-wrapper">
			<div className={`${baseClass} ${baseClass}_${props.icon}`} />
		</div>
	);
}
