import React, {PropTypes} from 'react';

export default function BalanceListItem(props) {
	const sumClass = 'balance-list-item__sum';

	return (
		<div className="balance-list-item" onClick={props.onClick}>
			<div className="balance-list-item__icon" />
			<div className="balance-list-item__direction">
				{props.participant}
			</div>
			<div className={[sumClass, `${sumClass}_${props.debtType}`].join(' ')}>
				{props.sum} P
			</div>
		</div>
	);
}

BalanceListItem.propTypes = {
	sum: PropTypes.number.isRequired,
	participant: PropTypes.string.isRequired,
	debtType: PropTypes.oneOf(['positive', 'negative', 'neutral']).isRequired,
};


// Usage example
// <BalanceListItem sum={2000} from="Вы" to="Дамир" debtType="positive" />
