import React, { PropTypes } from 'react';
import styles from './checkbox.css';

export default function Checkbox(props) {
	const { id, checked, disabled, children, ...inputProps } = props;

	return (
		<label className={styles.root} htmlFor={id}>
			<input
				className={styles.input}
				type="checkbox"
				id={id}
				checked={checked}
				disabled={disabled}
				{...inputProps}
			/>

			<span className={styles.checkbox} />

			<span className={styles.content}>
				{children}
			</span>
		</label>
	);
}

Checkbox.propTypes = {
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
};
