import React, {PropTypes} from 'react';

export default function GreySubtitle(props) {
	const classes = ['grey-subtitle'];

	if (props.userSelection) {
		classes.push('grey-subtitle_user-selection');
	}

	return (
		<div className={classes.join(' ')} style={props.style || {}} onClick={props.onClick}>
			{props.text}
		</div>
	);
}

GreySubtitle.propTypes = {
	text: PropTypes.string.isRequired,
};


// Usage example
// <GreySubtitle text="Ваш баланс" userSelection/>
