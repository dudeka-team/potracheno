import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './action-button.css';

export default class ActionButton extends PureComponent {
	static propTypes = {
		children: PropTypes.node,
		onClick: PropTypes.func,
	};

	render() {
		const { children, onClick } = this.props;

		return (
			<div className={styles.root} onClick={onClick}>
				<div className={styles.content}>
					{children}
				</div>
			</div>
		);
	}
}
