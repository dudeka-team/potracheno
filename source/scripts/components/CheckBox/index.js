import React, {PropTypes} from 'react';

export default function CheckBox(props) {
	const baseClass = 'checkbox';
	const classes = [baseClass];

	if (props.checked) {
		classes.push(`${baseClass}_checked`);
	}

	return (
		<div className={classes.join(' ')} {...props} />
	);
}

CheckBox.propTypes = {
	checked: PropTypes.bool,
};

// Usage example
// <CheckBox checked />
