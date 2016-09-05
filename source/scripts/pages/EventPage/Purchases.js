import React from 'react';
import {withRouter} from 'react-router';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Fab from '../../components/Fab';
import PurchaseInfo from '../../components/PurchaseInfo';
import PurchaseListItem from '../../components/PurchaseListItem';
import Popup from '../../components/Popup';

function getSubtitle(participantsCount, eventParticipantsCount) {
	let result;

	if (participantsCount === 1) {
		result = `1 из ${eventParticipantsCount} участвует`;
	} else {
		result = `${participantsCount} из ${eventParticipantsCount} участвуют`;
	}

	return result;
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

	goToNewPurchase() {
		this.props.router.push(`/events/${this.props.eventId}/purchases/new`);
	},

	goToPurchase(purchaseId) {
		const {props} = this;
		props.router.push(`/events/${props.eventId}/purchases/${purchaseId}`);
	},

	render() {
		const {state, props} = this;
		const {currentEvent} = props;
		return (
			<div>
				{state.popupOpened && (
					<Popup
						title={this.state.openedPurchase.name}
						closeIcon
						onClose={this.closePopup}
					>
						<PurchaseInfo
							purchase={state.openedPurchase}
							eventParticipants={currentEvent.participants}
						/>
					</Popup>
				)}
				{props.purchases
					.slice()
					.reverse()
					.map(purchase => {
						const {participants} = purchase;
						return (
							<PurchaseListItem
								key={purchase.id}
								buyer={purchase.payer}
								title={purchase.name}
								subtitle={getSubtitle(participants.length, currentEvent.participants.length)}
								price={purchase.amount}
								onClick={() => this.goToPurchase(purchase.id)}
							/>
						);
					})}
				<Fab onClick={this.goToNewPurchase}><AddShoppingCart /></Fab>
			</div>
		);
	},
});

export default withRouter(EventPurchasesPage);
