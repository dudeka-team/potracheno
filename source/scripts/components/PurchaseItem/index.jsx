import React from 'react';

const PurchaseItem = React.createClass({
	render() {
		let purchaseItems = this.props.data.map((item) => {
			return (
				<li className='purchase-item' key={item.id}>
					<div className='purchase-item__descr'>
						<div className='purchase-item__buyer'>{item.buyer}</div>
						<div className='purchase-item__title'>{item.title}</div>
						<div className='purchase-item__subtitle'>{item.subtitle}</div>
					</div>
					<div className='purchase-item__price'>{item.price}</div>
				</li>
			);
		});
		return (
				<ul className="purchase-list">
					{purchaseItems}
				</ul>
		);
	}
});

export default PurchaseItem
