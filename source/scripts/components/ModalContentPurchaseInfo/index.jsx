import React from 'react';
import ParticipantList from '../ParticipantList';
import NonParticipantList from '../NonParticipantList';


let data = {
	purchaseTitle: 'Шашлык',
	authorName: 'Андрей',
	participantList: [
		{
			name: 'Евгений',
			id: 1
		},
		{
			name: 'Дима',
			id: 2
		},
		{
			name: 'Вася',
			id: 3
		},
		{
			name: 'Петя',
			id: 4
		},
		{
			name: 'Коля',
			id: 5
		}
	],
	nonParticipantList: [
		{
			name: 'Андрей',
			id: 1
		},
		{
			name: 'Кузя',
			id: 2
		},
		{
			name: 'Полина',
			id: 3
		},
		{
			name: 'Алена',
			id: 4
		},
		{
			name: 'Екатерина',
			id: 5
		}
	]
}

class ModalContentPurchaseInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data};
	}
	render() {
		return  (
			<div>
				<div className='modal-topbar'>
					<div className='modal-topbar__icon'></div>
					<div className='modal-topbar__title'>Шашлык</div>
				</div>
				<div className='modal-purchase-info'>
					<div className='modal-purchase-info__author'>Андрей заплатил</div>
					<div className='modal-purchase-info__price'>2500 р</div>
				</div>
				<div className='modal-purchase-list-header modal-purchase-list-header--participation'>Участвуют в покупке</div>
				<ParticipantList data={this.state.data} />
				<div className='modal-purchase-list-header modal-purchase-list-header--non-participation'>Не участвуют в покупке</div>
				<NonParticipantList data={this.state.data} />
			</div>
		);
	}
}

export default ModalContentPurchaseInfo;
