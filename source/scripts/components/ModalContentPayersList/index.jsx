import React from 'react';

class ModalContentPayersList extends React.Component{
	constructor(props) {
		super(props);
		let checkboxArr = [];
		this.props.data.payers.forEach((item, i, arr) => {
			checkboxArr.push({id: i + 1, checked: false})
		});
		this.state = {checkboxArr}
		this.updateState = this.updateState.bind(this);
	}

	updateState(e) {
		let index = e.target.id.slice(-1),
				newArr = this.state.checkboxArr,
				currentCheckbox = newArr[index - 1];
		
		currentCheckbox.checked = (currentCheckbox.checked === false) ? true : false;
		this.setState({
			checkboxArr: newArr
		});
	}

	render() {
		let listItems = this.props.data.payers.map(item => {
			return (
				<li className='modal-content-payers__list-item payers-list-item' key={item.id}>
					<div className='payers-list-item__name'>{item.name}</div>
					<div className='payers-list-item__checkbox-wraper'>
						<input id={'payers-list-checkbox-' + item.id} onClick = {this.updateState} className='payers-list-item__checkbox' type='checkbox'/>
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
};

export default ModalContentPayersList;
