import React from 'react';
import List from '../List';
import ListItem from '../ListItem';
import BlueSubtitle from '../BlueSubtitle';


const users = {
	purchaseTitle: 'Шашлык',
	authorName: 'Андрей',
	participantList: [
		{
			name: 'Петя',
			id: 1,
		},
		{
			name: 'Дима',
			id: 2,
		},
		{
			name: 'Вася',
			id: 3,
		},
		{
			name: 'Петя',
			id: 4,
		},
		{
			name: 'Коля',
			id: 5,
		},
	],
	nonParticipantList: [
		{
			name: 'Андрей',
			id: 1,
		},
		{
			name: 'Кузя',
			id: 2,
		},
		{
			name: 'Полина',
			id: 3,
		},
		{
			name: 'Алена',
			id: 4,
		},
		{
			name: 'Екатерина',
			id: 5,
		},
		{
			name: 'Полина',
			id: 6,
		},
		{
			name: 'Алена',
			id: 7,
		},
		{
			name: 'Екатерина',
			id: 8,
		},
	],
};

const PurchaseInfo = React.createClass({
	getInitialState() {
		return {
			users,
		};
	},
	render() {
		let participants = this.state.users.participantList.map(item => {
			return (
				<ListItem id={item.id} text={item.name} key={item.id} isCheckBox={false} />
			);
		});
		let nonParticipants = this.state.users.nonParticipantList.map(item => {
			return (
				<ListItem id={item.id} text={item.name} key={item.id} isCheckBox={false} />
			);
		});
		return (
			<div>
				<div className="purchase-info">
					<div className="purchase-info__author">Андрей заплатил</div>
					<div className="purchase-info__price">2500 р</div>
				</div>
				<BlueSubtitle text="Участвуют в покупке" />
				<List>{participants}</List>
				<BlueSubtitle text="Не участвуют в покупке" />
				<List>{nonParticipants}</List>
			</div>
		);
	},
});

export default PurchaseInfo;
