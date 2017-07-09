import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './form-row.css';

export default function FormRow(props) {
	return (
		<div className={classNames(styles.root, props.className)}>
			{props.children}
		</div>
	);
}

FormRow.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};
