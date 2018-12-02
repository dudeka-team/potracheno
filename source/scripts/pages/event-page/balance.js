import React from 'react';
import { connect } from 'react-redux';
import Portal from 'react-portal';
import assign from 'object-assign';

import BalanceListItem from '../../components/balance-list-item';
import BalanceCheck from '../../components/balance-check';
import BalanceItemPopup from '../../components/balance-item-popup';
import PopupPoster from '../../components/popup-poster';
import Separator from '../../components/separator';
import GreySubtitle from '../../components/grey-subtitle';
import FlexContainer from '../../components/flex-container';
import Poster from '../../components/poster';
import Wrapper from '../../components/wrapper';

import {
	getEventBalance,
	getEventsParticipantsDebts,
} from '../../modules/balance';
import repayDebt from '../../actions/repay-debt';

import {
	createEventActionAsync,
	eventActionTypes,
} from '../../actions/create-event-action';

class BalancePage extends React.Component {
	constructor(props) {
		super(props);
		const { currentEvent } = this.props;
		const actions = Object.keys(
			(currentEvent && currentEvent.actions) || []
		).map(config => assign({ config }, currentEvent.actions[config]));
		this.state = {
			actions,
			showPopup: false,
			showPopupPoster: false,
		};
	}

	getDebtsData = () => {
		const allDebts = getEventsParticipantsDebts(
			getEventBalance(this.props.eventsById[this.props.eventId]),
			this.props.eventsById[this.props.eventId]
		);
		const { currentUser } = this.props;

		const positiveDebts = allDebts.filter(debt => currentUser === debt.to);
		const negativeDebts = allDebts.filter(debt => currentUser === debt.from);
		const othersDebts = allDebts.filter(
			debt => currentUser !== debt.from && currentUser !== debt.to
		);

		return {
			allDebts,
			positiveDebts,
			negativeDebts,
			othersDebts,
			hasReturnedDebts:
				this.state.actions.filter(
					action => action.config.actionType === 'giveBack'
				).length > 0,
		};
	};

	repayDebtHandler = debt => {
		const { props } = this;
		let oldRepayedFrom = 0;
		let oldRepayedTo = 0;

		if (props.eventsById[props.eventId].repayedDebts) {
			oldRepayedFrom =
				this.props.eventsById[this.props.eventId].repayedDebts[debt.from] || 0;
			oldRepayedTo = this.props.eventsById[this.props.eventId].repayedDebts[
				debt.to
			];
		}

		const actionType =
			Math.abs(this.state.currentDebt.sum) === debt.sum
				? 'giveBack'
				: 'giveBackPartially';

		const currentUser = props.localEvents[props.eventId];

		// Создаю копию для логики действий
		let debtTo = debt.to;

		if (currentUser === debtTo) {
			debtTo = debt.from;
		}

		const newAction = {
			config: eventActionTypes[actionType](
				currentUser,
				debtTo,
				debt.sum,
				new Date().getTime()
			),
		};

		if (actionType === 'giveBack') {
			const newActions = this.state.actions;
			newActions.push(newAction);
			this.setState({
				actions: newActions,
			});
		}

		props.dispatch(
			createEventActionAsync({
				eventId: props.eventId,
				eventActionInfo: newAction,
			})
		);

		props.dispatch(
			repayDebt(
				props.eventId,
				debt.sum,
				debt.from,
				debt.to,
				oldRepayedFrom,
				oldRepayedTo
			)
		);

		this.setState({
			showPopup: false,
		});
	};

	showPopupPoster = content => {
		this.setState({
			showPopupPoster: true,
			popupPosterContent: content,
		});

		setTimeout(() => {
			this.setState({
				showPopupPoster: false,
			});
		}, 2000);
	};

	showRepayPopup = debt => {
		this.setState({
			showPopup: true,
			currentDebt: debt,
		});
	};

	closeRepayPopup = () => {
		this.setState({
			showPopup: false,
		});
	};

	renderNoPurchasesNotification = () => {
		return (
			<FlexContainer alignItems="center" justifyContent="center" fullHeight>
				<Poster icon="purchase">
					Баланс появится, когда вы заведёте покупки
				</Poster>
			</FlexContainer>
		);
	};

	renderNoPendingDebtsNotification = () => {
		return (
			<FlexContainer alignItems="center" justifyContent="center" fullHeight>
				<Poster icon="check">Все долги возвращены</Poster>
			</FlexContainer>
		);
	};

	render() {
		const { currentUser } = this.props;
		const {
			allDebts,
			positiveDebts,
			negativeDebts,
			othersDebts,
			hasReturnedDebts,
		} = this.getDebtsData();

		if (allDebts.length === 0 && !hasReturnedDebts) {
			return this.renderNoPurchasesNotification();
		}

		if (allDebts.length === 0 && hasReturnedDebts) {
			return this.renderNoPendingDebtsNotification();
		}

		return (
			<Wrapper>
				<div className="balance-page">
					<Portal isOpened>
						<PopupPoster
							text={this.state.popupPosterContent}
							isOpened={this.state.showPopupPoster}
						/>
					</Portal>

					<Portal
						closeOnEsc
						closeOnOutsideClick
						isOpened={this.state.showPopup}
					>
						<BalanceItemPopup
							debt={this.state.currentDebt}
							onSubmit={this.repayDebtHandler}
							onClose={() => this.closeRepayPopup()}
						/>
					</Portal>

					<BalanceCheck debts={allDebts} onCopy={this.showPopupPoster} />

					<Separator />

					<GreySubtitle>Текущие долги</GreySubtitle>

					{positiveDebts.map(debt => (
						<BalanceListItem
							key={`${debt.from}${debt.to}${debt.sum}`}
							sum={Math.abs(Math.round(debt.sum))}
							from={debt.from}
							to={`${debt.to} ${currentUser === debt.to ? '(Вы)' : ''}`.trim()}
							debtType="positive"
							onClick={() => this.showRepayPopup(debt)}
						/>
					))}

					{negativeDebts.map(debt => (
						<BalanceListItem
							key={`${debt.from}${debt.to}${debt.sum}`}
							sum={Math.abs(Math.round(debt.sum))}
							from={`${debt.from} ${
								currentUser === debt.from ? '(Вы)' : ''
							}`.trim()}
							to={debt.to}
							debtType="negative"
							onClick={() => this.showRepayPopup(debt)}
						/>
					))}

					{othersDebts.map(debt => (
						<BalanceListItem
							key={`${debt.to}${debt.from}${debt.sum}`}
							sum={Math.abs(Math.round(debt.sum))}
							from={debt.from}
							to={debt.to}
							debtType="neutral"
						/>
					))}
				</div>
			</Wrapper>
		);
	}
}

function mapStateToProps({ events }) {
	return {
		eventsById: events.eventsById,
		currentEvent: events.currentEvent,
		isFetchingEvent: events.isFetchingEvent,
		localEvents: events.localEvents,
	};
}

export default connect(mapStateToProps)(BalancePage);
