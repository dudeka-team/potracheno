import React, {PropTypes} from 'react';

export default function BalanceListItem(props) {
	const baseClass = 'balance-list-item';

	return (
		<div
			className={[baseClass, `${baseClass}_${props.debtType}`].join(' ')}
			onClick={props.onClick}
		>
			<div className={'balance-list-item__icon'} />
			<div className="balance-list-item__direction">
				{props.participant}
			</div>
			<div className="balance-list-item__sum">
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
