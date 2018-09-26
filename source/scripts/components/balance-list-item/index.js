import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import sumFormat from '../../modules/sum-format';
import styles from './balance-list-item.css';

export default class BalanceListItem extends PureComponent {
	static propTypes = {
		sum: PropTypes.number.isRequired,
		from: PropTypes.string.isRequired,
		to: PropTypes.string.isRequired,
		debtType: PropTypes.oneOf(['positive', 'negative', 'neutral', 'returned']).isRequired,
		onClick: PropTypes.func,
	};

	render() {
		const {
			debtType,
			from,
			to,
			sum,
			onClick,
		} = this.props;

		return (
			<div
				className={classNames(styles.root, styles[`root_${debtType}`])}
				onClick={onClick}
			>
				<div className={styles.wrapper}>
					<div className={styles.direction}>
						<div className={styles.from}>{from}</div>
						<div className={styles.icon} />
						<div className={styles.to}>{to}</div>
					</div>
				</div>
				<div className={styles.sum}>
					{sumFormat(sum)} P
				</div>
			</div>
		);
	}
}
