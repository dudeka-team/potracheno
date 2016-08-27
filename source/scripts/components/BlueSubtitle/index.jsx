import React, {PropTypes} from 'react';

export default function BlueSubtitle(props) {
	return (
		<div className="blue-subtitle">
			{props.text}
		</div>
	);
};

BlueSubtitle.propTypes = {
	text: PropTypes.string.isRequired, 
};


// Usage example
// <BlueSubtitle text="Ваш баланс" />

