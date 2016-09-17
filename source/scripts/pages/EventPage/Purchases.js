import React from 'react';
import withRouter from 'react-router/lib/withRouter';
import {connect} from 'react-redux';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';

import Wrapper from '../../components/Wrapper';
import Fab from '../../components/Fab';
import PurchaseInfo from '../../components/PurchaseInfo';
import PurchaseListItem from '../../components/PurchaseListItem';
import Popup from '../../components/Popup';
import FlexContainer from '../../components/FlexContainer';
import Poster from '../../components/Poster';

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

	renderPopup() {
		const {state, props} = this;
		return (
			<Popup
				title={state.openedPurchase.name}
				closeIcon
				onClose={this.closePopup}
			>
				<PurchaseInfo
					purchase={state.openedPurchase}
					eventParticipants={props.eventParticipants}
				/>
			</Popup>
		);
	},

	renderPurchases() {
		const {props} = this;
		const {localEvents, eventParticipants} = props;
		const currentUser = localEvents[props.eventId];

		return props.purchases
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
			});
	},

	renderPlaceholder() {
		return (
			<FlexContainer alignItems="center" justifyContent="center" fullHeight>
				<Poster icon="purchase" text="У вас пока нет покупок" />
			</FlexContainer>
		);
	},

	render() {
		const {props} = this;
		return (
			<Wrapper>
				{this.state.popupOpened && this.renderPopup()}
				{props.purchases.length ?
					this.renderPurchases()
					:
					this.renderPlaceholder()
				}

				<Fab
					backgroundColor="#ffe151"
					iconStyle={{fill: '#333'}}
					onClick={this.goToNewPurchase}
				>
					<AddShoppingCart />
				</Fab>
			</Wrapper>
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
