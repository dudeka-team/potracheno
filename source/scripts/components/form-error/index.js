import React from 'react';
import PropTypes from 'prop-types';
import styles from './form-error.css';

export default function FormError(props) {
	const { visible, children } = props;

	if (!visible) {
		return null;
	}

	return (
		<p className={styles.root}>
			{children}
		</p>
	);
}

FormError.propTypes = {
	children: PropTypes.node,
	visible: PropTypes.bool,
};
