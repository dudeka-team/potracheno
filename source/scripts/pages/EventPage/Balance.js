import React from 'react';
import { connect } from 'react-redux';
import Portal from 'react-portal';
import assign from 'object-assign';

import BalanceListItem from '../../components/BalanceListItem';
import BalanceCheck from '../../components/BalanceCheck';
import BalanceItemPopup from '../../components/BalanceItemPopup';
import PopupPoster from '../../components/PopupPoster';
import Separator from '../../components/Separator';
import GreySubtitle from '../../components/GreySubtitle';
import FlexContainer from '../../components/FlexContainer';
import Poster from '../../components/Poster';
import Wrapper from '../../components/Wrapper';

import { getEventBalance, getEventsParticipantsDebts } from '../../modules/balance';
import repayDebt from '../../actions/repayDebt';

import { createEventActionAsync, eventActionTypes } from '../../actions/createEventAction';

const BalancePage = React.createClass({
	getInitialState() {
		const { currentEvent } = this.props;
		const actions = Object
			.keys((currentEvent && currentEvent.actions) || [])
			.map((config) => assign({ config }, currentEvent.actions[config]));
		return {
			actions,
			showPopup: false,
			showPopupPoster: false,
		};
	},

	repayDebtHandler(debt) {
		const { props } = this;
		let oldRepayedFrom = 0;
		let oldRepayedTo = 0;

		if (props.eventsById[props.eventId].repayedDebts) {
			oldRepayedFrom =
				this.props.eventsById[this.props.eventId].repayedDebts[debt.from]
					|| 0;
			oldRepayedTo =
				this.props.eventsById[this.props.eventId].repayedDebts[debt.to];
		}

		const actionType = (Math.abs(this.state.currentDebt.sum) === debt.sum) ?
			'giveBack' : 'giveBackPartially';

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
				(new Date()).getTime()
			),
		};

		if (actionType === 'giveBack') {
			const newActions = this.state.actions;
			newActions.push(newAction);
			this.setState({
				actions: newActions,
			});
		}

		props.dispatch(createEventActionAsync({
			eventId: props.eventId,
			eventActionInfo: newAction,
		}));

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
	},

	showPopupPoster(content) {
		this.setState({
			showPopupPoster: true,
			popupPosterContent: content,
		});

		setTimeout(() => {
			this.setState({
				showPopupPoster: false,
			});
		}, 2000);
	},

	showRepayPopup(debt) {
		this.setState({
			showPopup: true,
			currentDebt: debt,
		});
	},

	closeRepayPopup() {
		this.setState({
			showPopup: false,
		});
	},

	render() {
		const { currentUser, eventId } = this.props;
		const eventsParticipantsDebts =
			getEventsParticipantsDebts(
				getEventBalance(this.props.eventsById[eventId]),
				this.props.eventsById[eventId]
			);

		let positiveSum = 0;
		let negativeSum = 0;
		const positiveDebts = eventsParticipantsDebts
			.filter((debt) => currentUser === debt.to)
			.map((debt) => {
				positiveSum += -Math.round(debt.sum);

				return (
					<BalanceListItem
						key={`${debt.from}${debt.to}${debt.sum}`}
						sum={-Math.round(debt.sum)}
						from={debt.from}
						to={debt.to + ((currentUser === debt.to && ' (Вы)') || '')}
						debtType="positive"
						onClick={() => this.showRepayPopup(debt)}
					/>
				);
			});

		const negativeDebts = eventsParticipantsDebts
			.filter((debt) => currentUser === debt.from)
			.map((debt) => {
				negativeSum += -Math.round(debt.sum);

				return (
					<BalanceListItem
						key={`${debt.from}${debt.to}${debt.sum}`}
						sum={-Math.round(debt.sum)}
						from={debt.from + ((currentUser === debt.from && ' (Вы)') || '')}
						to={debt.to}
						debtType="negative"
						onClick={() => this.showRepayPopup(debt)}
					/>
				);
			});

		const othersDebts = eventsParticipantsDebts
			.filter((debt) => currentUser !== debt.from && currentUser !== debt.to)
			.map((debt) => (
				<BalanceListItem
					key={`${debt.to}${debt.from}${debt.sum}`}
					sum={-Math.round(debt.sum)}
					from={debt.from}
					to={debt.to}
					debtType="neutral"
				/>
			));

		const returnedDebtsActions = [];
		this.state.actions.slice().reverse().forEach((action) => {
			if (action.config.actionType === 'giveBack') {
				returnedDebtsActions.push(action);
			}
		});

		const returnedDebts = returnedDebtsActions
			.filter((action) => action.config.actionType === 'giveBack')
			.map((action) => (
				<BalanceListItem
					key={`${action.config.debtSum}${action.config.currentUser}${action.config.payerName}`}
					sum={action.config.debtSum}
					from={action.config.currentUser}
					to={action.config.payerName}
					debtType="returned"
				/>
			));

		return (
			<Wrapper>
				<div className="balance-page">
					{(positiveSum !== 0 || negativeSum !== 0 || othersDebts.length !== 0) &&
						<BalanceCheck debts={eventsParticipantsDebts} onCopy={this.showPopupPoster} />
					}
					<Portal isOpened>
						<PopupPoster
							text={this.state.popupPosterContent}
							isOpened={this.state.showPopupPoster}
						/>
					</Portal>
					<Portal closeOnEsc closeOnOutsideClick isOpened={this.state.showPopup}>
						<BalanceItemPopup
							debt={this.state.currentDebt}
							onSubmit={this.repayDebtHandler}
							onClose={() => this.closeRepayPopup()}
						/>
					</Portal>
					{(positiveSum !== 0 || negativeSum !== 0) &&
						<div>
							<Separator />
							<GreySubtitle text="Текущие долги" />
						</div>}
					{positiveDebts}
					{negativeDebts}
					{othersDebts}
					<div>
						{(returnedDebts.length !== 0) &&
							<div>
								{(negativeDebts.length !== 0 || positiveDebts.length !== 0) &&
									<Separator />
								}
								<GreySubtitle text="Возвращенные долги" />
								{returnedDebts}
							</div>
						}
					</div>
				</div>
				{(positiveSum === 0 && negativeSum === 0 && returnedDebts.length === 0) &&
					<FlexContainer alignItems="center" justifyContent="center" fullHeight>
						<Poster icon="purchase" text="Баланс появится, когда вы заведёте покупки" />
					</FlexContainer>
				}
			</Wrapper>
		);
	},
});

function mapStateToProps({ events }) {
	return {
		eventsById: events.eventsById,
		currentEvent: events.currentEvent,
		isFetchingEvent: events.isFetchingEvent,
		localEvents: events.localEvents,
	};
}

export default connect(mapStateToProps)(BalancePage);
