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

class ModalContentPayers extends React.Component {
	constructor() {
		super();
		this.state = {data};
	}
	render() {
		return  (
			<div className="modal-content-payers">
				<div className='modal-content-payers__header'>{this.state.data.modalHeader}</div>
				<ModalContentPayersList data={this.state.data}/>
				<div className="modal-content-payers__bottom-bar">
					<button className='modal-content-payers__button modal-content-payers__button--cancel-button'>Отмена</button>
					<button className='modal-content-payers__button modal-content-payers__button--add-button'>Добавить</button>
				</div>
			</div>
		);
	}
}


export default ModalContentPayers;
