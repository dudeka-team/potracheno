import React from 'react';
import PurchaseItem from '../PurchaseItem';

let data = [{
	buyer: 'Андрей',
	title: 'Шашлык',
	subtitle: 'Все 5 участников',
	price: '2500 р',
	id: 1
},
{
	buyer: 'Максим',
	title: 'Пицца',
	subtitle: 'Все 5 участников',
	price: '5000 р',
	id: 2
},
{
	buyer: 'Евгений',
	title: 'Суши',
	subtitle: '3 участника',
	price: '3000 р',
	id: 3
}];


const PurchaseList = React.createClass({
	getInitialState: function() {
		return {data: data};
	},
	render() {
		return  (
			<div className="purchase-box">
				<PurchaseItem data={this.state.data} />
			</div>
		);
	}
})


export default PurchaseList;

