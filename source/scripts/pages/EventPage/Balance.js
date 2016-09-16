import React from 'react';
import {connect} from 'react-redux';
import Portal from 'react-portal';

import BalanceListItem from '../../components/BalanceListItem';
import BalanceCheck from '../../components/BalanceCheck';
import BalanceItemPopup from '../../components/BalanceItemPopup';
import BalanceStatus from '../../components/BalanceStatus';
import PopupPoster from '../../components/PopupPoster';
import Separator from '../../components/Separator';
import GreySubtitle from '../../components/GreySubtitle';
import FlexContainer from '../../components/FlexContainer';
import Poster from '../../components/Poster';
import Wrapper from '../../components/Wrapper';


import {getEventBalance, getEventsParticipantsDebts} from '../../modules/balance';
import repayDebt from '../../actions/repayDebt';

import {createEventActionAsync, eventActionTypes} from '../../actions/createEventAction';


const BalancePage = React.createClass({
	getInitialState() {
		return {
			showPopup: false,
			showPopupPoster: false,
		};
	},

	repayDebtHandler(debt) {
		const {props} = this;
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

		props.dispatch(createEventActionAsync({
			eventId: props.eventId,
			eventActionInfo: {
				config: eventActionTypes[actionType](
					debt.from,
					debt.to,
					debt.sum,
					(new Date()).getTime()
				),
			},
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
	showPopupPoster() {
		this.setState({
			showPopupPoster: true,
		});
		setTimeout(() => {
			this.setState({
				showPopupPoster: false,
			});
		}, 1500);
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
		const {currentUser, eventId} = this.props;

		const eventsParticipantsDebts =
			getEventsParticipantsDebts(
				getEventBalance(this.props.eventsById[eventId]),
				this.props.eventsById[eventId]
			);
		let positiveSum = 0;
		let negativeSum = 0;
		const positiveDebts = eventsParticipantsDebts.map((debt, i) => {
			if (currentUser === debt.to) {
				positiveSum += -Math.round(debt.sum);
				return (
					<BalanceListItem
						key={i}
						sum={-Math.round(debt.sum)}
						participant={debt.from + ((currentUser === debt.from && ' (Вы)') || '')}
						debtType="positive"
						onClick={() => this.showRepayPopup(debt)}
					/>
				);
			}
		});

		const negativeDebts = eventsParticipantsDebts.map((debt, i) => {
			if (currentUser === debt.from) {
				negativeSum += -Math.round(debt.sum);
				return (
					<BalanceListItem
						key={i}
						sum={-Math.round(debt.sum)}
						participant={debt.to + ((currentUser === debt.to && ' (Вы)') || '')}
						debtType="negative"
						onClick={() => this.showRepayPopup(debt)}
					/>
				);
			}
		});


		return (
			<Wrapper>
				<div className="balance-page">
					{(positiveSum !== 0 || negativeSum !== 0) &&
						<BalanceCheck debts={eventsParticipantsDebts} onClick={this.showPopupPoster} />
					}
					<Separator />
					<PopupPoster
						text="Чек скопирован в буфер обмена"
						popupPosterOpen={this.state.showPopupPoster}
					/>
					<Portal closeOnEsc closeOnOutsideClick isOpened={this.state.showPopup}>
						<BalanceItemPopup
							debt={this.state.currentDebt}
							onSubmit={this.repayDebtHandler}
							onClose={() => this.closeRepayPopup()}
						/>
					</Portal>
					<GreySubtitle text="Текущие долги" />
					{positiveDebts}
					{(positiveSum !== 0) &&
						<BalanceStatus
							text="Вам должны"
							sum={positiveSum}
							debtStatus="positive"
						/>}
					{negativeDebts}
					{(negativeSum !== 0) &&
						<BalanceStatus
							text="Вы должны"
							sum={negativeSum}
							debtStatus="negative"
						/>}
					<Separator />
					<GreySubtitle text="Возвращенные долги" />
				</div>
				{(positiveSum === 0 && negativeSum === 0) &&
					<FlexContainer alignItems="center" justifyContent="center" fullHeight>
						<Poster icon="purchase" text="Баланс появится, когда вы заведете покупки" />
					</FlexContainer>
				}
			</Wrapper>
		);
	},
});

function mapStateToProps({events}) {
	return {
		eventsById: events.eventsById,
		currentEvent: events.currentEvent,
		isFetchingEvent: events.isFetchingEvent,
		localEvents: events.localEvents,
	};
}

export default connect(mapStateToProps)(BalancePage);
