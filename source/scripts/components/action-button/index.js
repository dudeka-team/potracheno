import React from 'react';
import PropTypes from 'prop-types';
import styles from './action-button.css';

export default function ActionButton({ children, ...restProps }) {
	return (
		<div {...restProps} className={styles.root}>
			<div className={styles.content}>{children}</div>
		</div>
	);
}

ActionButton.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
};
