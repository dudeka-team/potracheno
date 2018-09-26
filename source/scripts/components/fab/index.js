import React from 'react';
import PropTypes from 'prop-types';
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
