import React, {PropTypes} from 'react';


export default function BalanceStatus(props) {
	return (
		<div className="balance-status">
			<div className="balance-status__text">{props.text}</div>
			<div className="balance-status__sum">{props.sum} р</div>
		</div>
	);
}

BalanceStatus.propTypes = {
	text: PropTypes.string.isRequired,
	sum: PropTypes.number.isRequired,
};

// Usage example
// <BalanceStatus text="Вам должны" sum={200} />
