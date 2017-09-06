import React from 'react';
import classNames from 'classnames';
import styles from './icon-svg.css';

export default function IconSVG(props) {
	const { className, children, ...restProps } = props;

	return (
		<svg
			viewBox="0 0 24 24"
			width="24"
			height="24"
			className={classNames(styles.root, className)}
			{...restProps}
		>
			{children}
		</svg>
	);
}
