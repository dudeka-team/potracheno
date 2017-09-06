import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import styles from './universal-list-item.css';

export default class UniversalListItem extends PureComponent {
	static propTypes = {
		children: PropTypes.node,
		prefix: PropTypes.node,
		price: PropTypes.number,
		isBordered: PropTypes.bool,
		checkBoxChecked: PropTypes.bool,
	};

	renderPrefix = () => {
		const { prefix } = this.props;

		if (!prefix) {
			return null;
		}

		return (
			<div className={styles.prefix}>
				{prefix}
			</div>
		);
	};

	renderPostfix = () => {
		const { postfix } = this.props;

		if (!postfix) {
			return null;
		}

		return (
			<div className={styles.postfix}>
				{postfix}
			</div>
		);
	}

	render() {
		const {
			isBordered,
			children,
			onClick,
		} = this.props;

		return (
			<div
				className={classNames(styles.root, {
					[styles.root_bordered]: isBordered,
				})}
				onClick={onClick}
			>
				{this.renderPrefix()}
				<div className={styles.content}>
					{children}
				</div>
				{this.renderPostfix()}
			</div>
		);
	}
}
