import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from './grey-subtitle.css';

export default class GreySubtitle extends PureComponent {
	static propTypes = {
		children: PropTypes.node,
		userSelection: PropTypes.bool,
		style: PropTypes.object,
		onClick: PropTypes.func,
	};

	render() {
		return (
			<div
				className={classNames(styles.root, {
					[styles['root_user-selection']]: this.props.userSelection,
				})}
				style={this.props.style || {}}
				onClick={this.props.onClick}
			>
				{this.props.children}
			</div>
		);
	}
}
