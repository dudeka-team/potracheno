import React from 'react';
import classNames from 'classnames';
import styles from './checkbox.css';

export default function Checkbox(props) {
	const {
		className,
		...inputProps
	} = props;

	return (
		<div className={classNames(styles.root, className)}>
			<input
				className={styles.input}
				type="checkbox"
				{...inputProps}
			/>

			<span className={styles.checkbox} />
		</div>
	);
}
