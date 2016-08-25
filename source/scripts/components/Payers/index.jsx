import React from 'react';
import PayersList from '../PayersList';

const data = {
	modalHeader: 'Кто платит',
	payers: [{
		name: 'Петя',
		id: 1,
	},
		{
			name: 'Вася',
			id: 2,
		},
		{
			name: 'Катя',
			id: 3,
		}],
};

const Payers = React.createClass({
	getInitialState() {
		return {
			data,
		};
	},
	render() {
		return (
			<div className="payers">
				<div className="payers__header">{this.state.data.modalHeader}</div>
				<PayersList data={this.state.data} />
			</div>
		);
	},
});


export default Payers;
