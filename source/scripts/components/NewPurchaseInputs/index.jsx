import React from 'react';
import Input from '../Input';

const PurchaseMainInputBlock = React.createClass({
	getInitialState() {
		return {
			name: '',
			amount: 0
		}
	},

	changedPurchaseName(name) {
		this.setState({ name });
		this.props.dataChanged(this.state);
	},

	changedPurchaseAmount(amount) {
		this.setState({ amount });
		this.props.dataChanged(this.state);
	},

	render() {
		return (
			<div className="new-purchase-inputs"> 

			</div>
		);
	}
});

export default PurchaseMainInputBlock;
