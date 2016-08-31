import React, {PropTypes} from 'react';

export default function Checkbox(props) {
	const baseClass = 'checkbox';
	const classes = [baseClass];

	if (props.checked) {
		classes.push(`${baseClass}_checked`);
	}

	return (
		<div className={classes.join(' ')} {...props} />
	);
}

Checkbox.propTypes = {
	checked: PropTypes.bool,
};

// Usage example
// <Checkbox checked />
