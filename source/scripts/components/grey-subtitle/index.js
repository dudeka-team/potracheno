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
		const { userSelection, text, style, onClick } = this.props;

		return (
			<div
				className={classNames(styles.root, {
					[styles['root_user-selection']]: userSelection,
				})}
				style={style || {}}
				onClick={onClick}
			>
				{text}
			</div>
		);
	}
}
