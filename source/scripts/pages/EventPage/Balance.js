import React from 'react';
import {connect} from 'react-redux';
import BlueSubtitle from '../../components/BlueSubtitle';
import BalanceListItem from '../../components/BalanceListItem';
import {getEventBalance, getEventsParticipantsDebts} from '../../modules/balance';
import repayDebt from '../../actions/repayDebt';
import BalanceItemPopup from '../../components/BalanceItemPopup';

const BalancePage = React.createClass({
	getInitialState() {
		return {
			showPopup: false,
		};
	},

	repayDebtHandler(debt) {
		let oldRepayedFrom = 0;
		let oldRepayedTo = 0;

		if (this.props.eventsById[this.props.eventId].repayedDebts) {
			oldRepayedFrom =
				Math.abs(this.props.eventsById[this.props.eventId].repayedDebts[debt.from])
					|| 0;
			oldRepayedTo =
				Math.abs(this.props.eventsById[this.props.eventId].repayedDebts[debt.to])
					|| 0;
		}

		this.props.dispatch(
			repayDebt(
				this.props.eventId,
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
		const {currentUser} = this.props;

		const eventsParticipantsDebts =
			getEventsParticipantsDebts(
				getEventBalance(this.props.eventsById[this.props.eventId]),
				this.props.eventsById[this.props.eventId]
			);

		return (
			<div className="balance-page">
				<BlueSubtitle text="Баланс участников" />
				<div>{
					eventsParticipantsDebts.map((debt, i) => {
						return (
							<BalanceListItem
								key={i}
								sum={-Math.round(debt.sum)}
								from={debt.from + ((currentUser === debt.from && ' (Вы)') || '')}
								to={debt.to + ((currentUser === debt.to && ' (Вы)') || '')}
								debtType="neutral"
								onClick={() => this.showRepayPopup(debt)}
							/>
						);
					})
				}</div>
				{
					this.state.showPopup &&
						<BalanceItemPopup
							debt={this.state.currentDebt}
							onSubmit={this.repayDebtHandler}
							onClose={() => this.closeRepayPopup()}
						/>
				}
			</div>
		);
	},
});

function mapStateToProps({events}) {
	return {
		eventsById: events.eventsById,
	};
}

export default connect(mapStateToProps)(BalancePage);
