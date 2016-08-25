import React, {PropTypes} from 'react';

export default function SquareButton(props) {
	return (
		<div className="square-button" onClick={props.onClick}>
			{props.text}
		</div>
	);
}

SquareButton.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};
