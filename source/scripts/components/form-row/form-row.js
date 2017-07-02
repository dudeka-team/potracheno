import React, { PropTypes } from 'react';
import styles from './form-row.css';

export default function FormRow(props) {
	return (
		<div className={styles.root}>
			{props.children}
		</div>
	);
}

FormRow.propTypes = {
	children: PropTypes.node.isRequired,
};
