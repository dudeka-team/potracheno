import React from 'react';

export default function PurchaseParticipants(props) {
	const baseClass = 'purchase-payer';
	const classes = [baseClass];
	if (props.disabled) {
		classes.push(`${baseClass}_disabled`);
	}
	return (
		<div onClick={props.onClick}>
			<div className="purchase-participants">
				<p className="purchase-participants__title">Кто оплачивает</p>
				<p className={classes.join(' ')}>{props.payer}</p>
			</div>
		</div>
	);
}
