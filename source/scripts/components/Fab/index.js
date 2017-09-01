import React, { PropTypes } from 'react';
import styles from './fab.css';

export default function Fab(props) {
	return (
		<button className={styles.root} onClick={props.onClick}>
			{props.children}
		</button>
	);
}

Fab.propTypes = {
	onClick: PropTypes.func,
};
