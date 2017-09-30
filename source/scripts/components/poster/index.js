import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from './poster.css';

export default class Poster extends PureComponent {
	static propTypes = {
		icon: PropTypes.string,
		children: PropTypes.node,
	};

	render() {
		const { icon, children } = this.props;

		return (
			<div className={styles.root}>
				<div className={styles['icon-wrapper']}>
					<div className={classNames(styles.icon, styles[`icon_${icon}`])} />
				</div>

				<div className={styles.content}>
					{children}
				</div>
			</div>
		);
	}
}
