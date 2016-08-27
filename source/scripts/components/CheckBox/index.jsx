import React, {PropTypes} from 'react';
import shortid from 'shortid';

export default function Checkbox(props) {
	const id = shortid.generate();

	return (
		<div {...props} className={['checkbox', props.className || ''].join(' ')}>
			<input
				id={id}
				className="checkbox__input"
				type="checkbox"
				checked={props.defaultChecked}
			/>
			<label className="checkbox__label" htmlFor={id} />
		</div>
	);
}

Checkbox.propTypes = {
	defaultChecked: PropTypes.bool,
};

// Usage example
// const id = 123;
// <Checkbox onClick={() => id} defaultChecked={true} />
