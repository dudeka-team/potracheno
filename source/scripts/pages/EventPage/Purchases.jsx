import React from 'react';
import {hashHistory} from 'react-router';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Fab from '../../components/Fab';
import PurchaseInfo from '../../components/PurchaseInfo';
import PurchaseListItem from '../../components/PurchaseListItem';
import Popup from '../../components/Popup';


const purchases = [
	{
		buyer: 'Женя',
		title: 'Пицца',
		subtitle: 'все 5 человек',
		price: 2000,
	},
	{
		buyer: 'Петя',
		title: 'Овощи',
		subtitle: 'все 5 человек',
		price: 2000,
	},
	{
		buyer: 'Вася',
		title: 'Сок',
		subtitle: 'все 5 человек',
		price: 2000,
	},
];

function goToNewPurchase() {
	hashHistory.push('newpurchase');
}

const EventPurchasesPage = React.createClass({

	getInitialState() {
		return {
			popupOpened: false,
		};
	},

	openPopup() {
		this.setState({
			popupOpened: true,
		});
	},

	closePopup() {
		this.setState({
			popupOpened: false,
		});
	},

	render() {
		const {state} = this;
		return (
			<div>
				{state.popupOpened && (
					<Popup
						title="Шашлык"
						closeIcon
						onClose={this.closePopup}
					>
						<PurchaseInfo />
					</Popup>
				)}
				{purchases.map((item) => {
					return (
						<PurchaseListItem
							buyer={item.buyer}
							title={item.title}
							subtitle={item.subtitle}
							price={item.price}
							onClick={() => {
								this.setState({
									popupOpened: true,
								});
							}}
						/>
					);
				})}
				<Fab onClick={goToNewPurchase}><AddShoppingCart /></Fab>
			</div>
		);
	},
});

export default EventPurchasesPage;
