import React from 'react';
import TextField from 'material-ui/TextField';
import SubHeader from '../SubHeader';

import Popup from '../Popup';

const BalanceItemPupop = React.createClass({
	getInitialState() {
		return {
			value: 0,
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
			props.onSubmit(Object.assign({payedDebt: state.value}, props.debt));
		}
	},

	render() {
		const {props, state} = this;
		const {debt} = props;
		return (
			<Popup
				unBordered
				largeHeader
				title="Отметить долг возвращенным"
				okButton={{
					text: 'ок',
					onClick: this.payDebt,
				}}
				cancelButton={{
					text: 'отмена',
					onClick: props.close,
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
							underlineFocusStyle={{borderColor: '#3f95ff'}}
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

export default BalanceItemPupop;

// Example of usage:
// <BalanceItemPupop
//		debt={debt} onClose={() => ...}
//		onSubmit={({payedDebt, to, from, sum}) => ...}
// />
