import React from 'react';
import {withRouter} from 'react-router';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Fab from '../../components/Fab';
import PurchaseInfo from '../../components/PurchaseInfo';
import PurchaseListItem from '../../components/PurchaseListItem';
import Popup from '../../components/Popup';


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

	goToNewPurchase() {
		this.props.router.push(`/events/${this.props.params.id}/purchases/new`);
	},

	render() {
		const {state} = this;
		return (
			<div>
				{state.popupOpened && (
					<Popup
						title={this.state.currentPurchase.name}
						closeIcon
						onClose={this.closePopup}
					>
						<PurchaseInfo {...this.state.currentPurchase}/>
					</Popup>
				)}
				{this.props.purchases.map((purchase, index) => {
					let payer = '';
					let subtitle = 'Все 5 участников';
					purchase.participants.forEach(participant => {
						if (participant.isPayer) {
							payer = participant.name;
						}
					});
					return (
						<PurchaseListItem
							key={index}
							buyer={payer}
							title={purchase.name}
							subtitle={subtitle}
							price={purchase.amount}
							onClick={() => {
								this.setState({
									popupOpened: true,
									currentPurchase: purchase,
								});
							}}
						/>
					);
				})}
				<Fab onClick={this.goToNewPurchase}><AddShoppingCart /></Fab>
			</div>
		);
	},
});

export default withRouter(EventPurchasesPage);
