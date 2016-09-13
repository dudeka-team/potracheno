import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Fab from '../../components/Fab';
import PurchaseInfo from '../../components/PurchaseInfo';
import PurchaseListItem from '../../components/PurchaseListItem';
import Popup from '../../components/Popup';
import {TabsContent} from '../../components/Tabs';

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
		const {props} = this;
		props.router.push(`/events/${props.eventId}/purchases/new`);
	},

	goToPurchase(purchaseId) {
		const {props} = this;
		props.router.push(`/events/${props.eventId}/purchases/${purchaseId}`);
	},

	render() {
		const {state, props} = this;
		const {localEvents} = props;
		const currentUser = localEvents[props.eventId];
		const {eventParticipants} = props;

		return (
			<div style={{position: 'relative', height: '100%'}}>
				<TabsContent>
					{state.popupOpened && (
						<Popup
							title={state.openedPurchase.name}
							closeIcon
							onClose={this.closePopup}
						>
							<PurchaseInfo
								purchase={state.openedPurchase}
								eventParticipants={eventParticipants}
							/>
						</Popup>
					)}
					{props.purchases
						.slice()
						.reverse()
						.map(purchase => {
							let payerName = purchase.payer;
							if (currentUser === payerName) {
								payerName += ' (Вы)';
							}
							const {participants} = purchase;
							return (
								<PurchaseListItem
									key={purchase.id}
									buyer={payerName}
									title={purchase.name}
									subtitle={getSubtitle(participants.length, eventParticipants.length)}
									price={purchase.amount}
									onClick={() => this.goToPurchase(purchase.id)}
								/>
							);
						})}
				</TabsContent>
				<Fab
					style={{position: 'absolute', bottom: '10px', right: '10px'}}
					onClick={this.goToNewPurchase}
				>
					<AddShoppingCart />
				</Fab>
			</div>
		);
	},
});

function mapStateToProps({events}) {
	return {
		currentEvent: events.currentEvent,
		localEvents: events.localEvents,
	};
}

export default connect(mapStateToProps)(withRouter(EventPurchasesPage));
