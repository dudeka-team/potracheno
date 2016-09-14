import React from 'react';

export default function Poster(props) {
	const baseClass = 'poster';
	return (
		<div className={`${baseClass}`}>
			<div className={`${baseClass}__icon-wrapper`}>
				<div className={`${baseClass}__icon ${baseClass}__icon_${props.icon}`} />
			</div>
			<div className={`${baseClass}__text`}>{props.text}</div>
		</div>
	);
}
