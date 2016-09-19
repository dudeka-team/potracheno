import React from 'react';

export default function Separator(props) {
	const classes = ['separator'];
	if (props.withShadow) {
		classes.push('separator_with-shadow');
	}
	return (
		<div className={classes.join(' ')} {...props} />
	);
}
