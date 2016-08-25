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
		},
		{
			name: 'Вася',
			id: 4,
		},
		{
			name: 'Катя',
			id: 5,
		},
		{
			name: 'Вася',
			id: 6,
		},
		{
			name: 'Катя',
			id: 7,
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
