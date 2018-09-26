import React from 'react';
import withRouter from 'react-router/lib/withRouter';
import { connect } from 'react-redux';

import Wrapper from '../../components/wrapper';
import Fab from '../../components/fab';
import IconShoppingCart from '../../components/icons/shopping-cart';
import PurchaseListItem from '../../components/purchase-list-item';
import FlexContainer from '../../components/flex-container';
import Poster from '../../components/poster';

function getSubtitle(participantsCount, eventParticipantsCount) {
	let result;

	if (participantsCount === 1) {
		result = `1 из ${eventParticipantsCount} участвует`;
	} else {
		result = `${participantsCount} из ${eventParticipantsCount} участвуют`;
	}

	return result;
}

class EventPurchasesPage extends React.Component {
	goToNewPurchase = () => {
		const { props } = this;
		props.router.push(`/events/${props.eventId}/purchases/new`);
	};

	goToPurchase = purchaseId => {
		const { props } = this;
		props.router.push(`/events/${props.eventId}/purchases/${purchaseId}`);
	};

	renderPurchases = () => {
		const { props } = this;
		const { localEvents, eventParticipants } = props;
		const currentUser = localEvents[props.eventId];

		return props.purchases
			.slice()
			.reverse()
			.map(purchase => {
				let payerName = purchase.payer;
				if (currentUser === payerName) {
					payerName += ' (Вы)';
				}
				const { participants } = purchase;
				return (
					<PurchaseListItem
						key={purchase.id}
						buyer={payerName}
						title={purchase.name}
						subtitle={getSubtitle(
							participants.length,
							eventParticipants.length
						)}
						price={purchase.amount}
						onClick={() => this.goToPurchase(purchase.id)}
					/>
				);
			});
	};

	renderPlaceholder = () => {
		return (
			<FlexContainer alignItems="center" justifyContent="center" fullHeight>
				<Poster icon="purchase">У вас пока нет покупок</Poster>
			</FlexContainer>
		);
	};

	render() {
		const { props } = this;
		return (
			<Wrapper>
				{props.purchases.length
					? this.renderPurchases()
					: this.renderPlaceholder()}

				<Fab onClick={this.goToNewPurchase}>
					<IconShoppingCart />
				</Fab>
			</Wrapper>
		);
	}
}

function mapStateToProps({ events }) {
	return {
		currentEvent: events.currentEvent,
		localEvents: events.localEvents,
	};
}

export default connect(mapStateToProps)(withRouter(EventPurchasesPage));
