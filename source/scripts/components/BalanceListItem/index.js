import React, { PropTypes } from 'react';
import sumFormat from '../../modules/sumFormat';

export default function BalanceListItem(props) {
	const baseClass = 'balance-list-item';

	return (
		<div
			className={[baseClass, `${baseClass}_${props.debtType}`].join(' ')}
			onClick={props.onClick}
		>
			<div className="balance-list-item__wrapper">
				<div className="balance-list-item__direction">
					<div className="balance-list-item__from">{props.from}</div>
					<div className={'balance-list-item__icon'} />
					<div className="balance-list-item__to">{props.to}</div>
				</div>
			</div>
			<div className="balance-list-item__sum">
				{sumFormat(props.sum)} P
			</div>
		</div>
	);
}

BalanceListItem.propTypes = {
	sum: PropTypes.number.isRequired,
	from: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	debtType: PropTypes.oneOf(['positive', 'negative', 'neutral', 'returned']).isRequired,
};


// Usage example
// <BalanceListItem sum={2000} from="Вы" to="Дамир" debtType="positive" />
