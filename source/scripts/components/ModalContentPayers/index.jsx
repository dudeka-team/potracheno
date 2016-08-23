import React from 'react';
import ModalContentPayersList from '../ModalContentPayersList';

let data = {
	modalHeader: 'Кто платит',
	payers: [{
		name: 'Петя',
		id: 1
	},
	{
		name: 'Вася',
		id: 2
	},
	{
		name: 'Катя',
		id: 3
	}]
}

const ModalContentPayers = React.createClass({
	getInitialState: function() {
		return {data: data};
	},
	render() {
		return  (
			<div className="modal-content-payers">
				<div className='modal-content-payers__header'>{this.state.data.modalHeader}</div>
				<ModalContentPayersList data={this.state.data}/>
			</div>
		);
	}
})


export default ModalContentPayers;
