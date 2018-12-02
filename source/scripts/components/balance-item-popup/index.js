import React from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import FormRow from '../form-row';
import FormLabel from '../form-label';
import FormInput from '../form-input';
import Popup from '../popup';

class BalanceItemPopup extends React.Component {
	state = {
		value: Math.abs(this.props.debt.sum),
	};

	handleChangeRepayedDebtAmount = event => {
		const debt = Math.abs(this.props.debt.sum);
		const value = Number(event.target.value);

		this.setState({
			value: Math.max(0, Math.min(debt, value)),
		});
	};

	payDebt = () => {
		const { state, props } = this;

		props.onSubmit({
			...props.debt,
			sum: state.value,
		});
	};

	render() {
		const { debt, onClose } = this.props;
		const { value } = this.state;

		return (
			<Popup
				unBordered
				largeHeader
				withTabs
				title="Отметить долг возвращенным"
				okButton={{
					text: 'ок',
					onClick: this.payDebt,
				}}
				cancelButton={{
					text: 'отмена',
					onClick: onClose,
				}}
			>
				<div className="balance-item-popup-wrapper">
					<div className="balance-list-item__direction">
						{debt.from}
						<span className="balance-list-item__arrow" />
						{debt.to}
					</div>

					<FormRow>
						<FormLabel htmlFor="repayed-debt-amount">Сколько, ₽</FormLabel>
						<FormInput
							id="repayed-debt-amount"
							type="number"
							value={value}
							onChange={this.handleChangeRepayedDebtAmount}
						/>
					</FormRow>
				</div>
			</Popup>
		);
	}
}

function mapStateToProps({ events }) {
	return {
		currentEvent: events.currentEvent,
		isFetchingEvent: events.isFetchingEvent,
	};
}

export default withRouter(connect(mapStateToProps)(BalanceItemPopup));
