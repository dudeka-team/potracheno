import React from 'react';

const ModalContentPayersList = React.createClass({
	render() {
		let listItems = this.props.data.payers.map(item => {
			return (
				<li className='modal-content-payers__list-item payers-list-item'>
					<div className='payers-list-item__name'>{item.name}</div>
					<div className='payers-list-item__checkbox-wraper'>
						<input id={'payers-list-checkbox-' + item.id} className='payers-list-item__checkbox' type='checkbox'/>
						<label className='payers-list-item__label' htmlFor={'payers-list-checkbox-' + item.id}></label>
					</div>
				</li>
			);
		});
		return (
			<ul className='modal-content-payers__list'>
				{listItems}
			</ul>
		);
	}
});

export default ModalContentPayersList;
