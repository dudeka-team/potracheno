import React from 'react';

export default function PurchaseParticipants(props) {
	return (
		<div onClick={props.onClick}>
			<div className="purchase-participants">
				<p className="purchase-participants__title"> Кто оплачивает </p>
				<p className="purchase-payer">{props.payer}</p>
			</div>
		</div>
	);
}
