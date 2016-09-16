import React from 'react';

export default function PurchaseListItem(props) {
	return (
		<div className="purchase-list-item" onClick={props.onClick}>
			<div className="purchase-list-item__descr">
				<div className="purchase-list-item__title">{ props.title }</div>
				<div className="purchase-list-item__buyer">{ props.buyer }</div>
				<div className="purchase-list-item__subtitle">{ props.subtitle }</div>
			</div>
			<div className="purchase-list-item__price">{ props.price } р</div>
		</div>
	);
}
