import React, { PropTypes } from 'react';
import styles from './form-label.css';

export default function FormLabel(props) {
	const { htmlFor, children } = props;

	return (
		<label
			className={styles.root}
			htmlFor={htmlFor}
		>
			{children}
		</label>
	);
}

FormLabel.propTypes = {
	children: PropTypes.node.isRequired,
	htmlFor: PropTypes.string.isRequired,
};
