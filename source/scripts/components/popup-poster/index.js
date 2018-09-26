import React from 'react';

export default function PopupPoster(props) {
	const classes = ['popup-poster'];
	if (props.isOpened) {
		classes.push('popup-poster__open');
	}
	return (
		<div
			className={classes.join(' ')}
			dangerouslySetInnerHTML={{ __html: props.text }}
		/>
	);
}
