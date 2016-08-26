import React from 'react';


const BalanceLabel = React.createClass({
	render() {
		return (
			<div className="balance-label">
				<div className="balance-label__debt-type">{this.props.debtType}</div>
				<div className="balance-label__debt-sum">{`${this.props.debtSum} р`}</div>
			</div>
		);
	},
});

export default BalanceLabel;
