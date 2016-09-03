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
		this.props.router.push(`/events/${this.props.eventId}/purchases/new`);
	},

	render() {
		const {state} = this;
		return (
			<div>
				{state.popupOpened && (
					<Popup
						title={this.state.openedPurchase.name}
						closeIcon
						onClose={this.closePopup}
					>
						<PurchaseInfo
							purchase={this.state.openedPurchase}
							eventParticipants={this.props.currentEvent.participants}
						/>
					</Popup>
				)}
				{this.props.purchases
					.slice()
					.reverse()
					.map(purchase => {
					const subtitle = 'Все 5 участников';
					return (
						<PurchaseListItem
							key={purchase.id}
							buyer={purchase.payer}
							title={purchase.name}
							subtitle={subtitle}
							price={purchase.amount}
							onClick={() => {
								this.setState({
									popupOpened: true,
									openedPurchase: purchase,
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
