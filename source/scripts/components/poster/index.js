import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './poster.css';

export default function Poster({ icon, children, ...restProps }) {
	return (
		<div {...restProps} className={styles.root}>
			<div className={styles['icon-wrapper']}>
				<div className={classNames(styles.icon, styles[`icon_${icon}`])} />
			</div>

			<div className={styles.content}>{children}</div>
		</div>
	);
}

Poster.propTypes = {
	icon: PropTypes.string,
	children: PropTypes.node,
};
