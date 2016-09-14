import React from 'react';

export default function PopupPoster(props) {
	const classes = ['popup-poster'];
	if (props.popupPosterOpen) {
		classes.push('popup-poster__open');
	}
	return (
		<div className={classes.join(' ')}>
			<div className="popup-poster__text">{props.text}</div>
		</div>
	);
}
