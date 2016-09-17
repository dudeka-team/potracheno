import React from 'react';
import {connect} from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import assign from 'object-assign';
import TextField from 'material-ui/TextField';
import SubHeader from '../SubHeader';

import Popup from '../Popup';

const BalanceItemPopup = React.createClass({
	getInitialState() {
		return {
			value: Math.abs(this.props.debt.sum),
			isAmountInvalid: false,
		};
	},

	amountChange(e) {
		const {debt} = this.props;
		let {value} = e.target;
		value = Number(value);
		this.setState({
			value,
			isAmountInvalid: isNaN(value) || value < 0 || value > Math.abs(debt.sum),
		});
	},

	payDebt() {
		const {state, props} = this;

		if (!this.state.isAmountInvalid) {
			props.onSubmit(assign({}, props.debt, {sum: state.value}));
		}
	},

	render() {
		const {props, state} = this;
		const {debt} = props;
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
					onClick: props.onClose,
				}}
			>
				<div className="balance-item-popup-wrapper">
					<div className="balance-list-item__direction">
						{debt.from}
						<span className="balance-list-item__arrow" />
						{debt.to}
					</div>
					<div className="sub-header-wrapper">
						<SubHeader text="Сколько" />
					</div>
					<div className="money-input-wrapper">
						<div className="input-money-label"> руб. </div>
						<TextField
							value={state.value}
							name="repay-debt-textfield"
							underlineFocusStyle={{borderColor: '#ffe151'}}
							style={{width: '100%'}}
							type="number"
							onChange={this.amountChange}
							errorText={state.isAmountInvalid &&
								'Сумма должна быть неотрицательной и не превосходить сумму долга'}
						/>
					</div>
				</div>
			</Popup>
		);
	},
});

function mapStateToProps({events}) {
	return {
		currentEvent: events.currentEvent,
		isFetchingEvent: events.isFetchingEvent,
	};
}

export default withRouter(connect(mapStateToProps)(BalanceItemPopup));
// Example of usage:
// <BalanceItemPopup
//		debt={debt} onClose={() => ...}
//		onSubmit={({sum, to, from, sum}) => ...}
// />
