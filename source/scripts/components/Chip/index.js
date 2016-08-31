import React, {PropTypes} from 'react';

export default function Chip(props) {
	return (
		<div {...props} className={['chip', props.className || ''].join(' ')}>
			<p className="chip__text">{props.text}</p>
			<div className="chip__cancel-button" onClick={props.onClose} />
		</div>
	);
}

Chip.propTypes = {
	text: PropTypes.string.isRequired,
	onClose: PropTypes.func,
};

// Usage example
// <Chip text="Юра" onClose={() => {}} className="myClass" />
