import React, {PropTypes} from 'react';

export default function BalanceListItem(props) {
	const sumClass = 'balance-list-item__sum';

	return (
		<div className="balance-list-item">
			<div className="balance-list-item__direction">
				{props.from}
				<span className="balance-list-item__arrow" />
				{props.to}
			</div>
			<div className={[sumClass, `${sumClass}_${props.debtType}`].join(' ')}>
				{props.sum} P
			</div>
		</div>
	);
}

BalanceListItem.propTypes = {
	sum: PropTypes.number.isRequired,
	from: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	debtType: PropTypes.oneOf(['positive', 'negative', 'neutral']).isRequired,
};


// Usage example
// <BalanceListItem sum={2000} from="Вы" to="Дамир" debtType="positive" />
