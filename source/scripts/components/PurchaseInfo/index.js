import React from 'react';
import UniversalListItem from '../UniversalListItem';
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
		const payer = this.props.participants.find(user => user.isPayer).name;
		const participants = this.props.participants.filter(user => user.participate);
		const nonParticipants = this.props.participants.filter(user => !user.participate);
		return (
			<div>
				<div className="purchase-info">
					<div className="purchase-info__author">{payer} заплатил</div>
					<div className="purchase-info__price">{this.props.amount}</div>
				</div>
				<BlueSubtitle text="Участвуют в покупке" />
				{participants.map(item => {
					return (
						<UniversalListItem id={item.id} text={item.name} key={item.id} isCheckbox={false} />
					);
				})}
				<BlueSubtitle text="Не участвуют в покупке" />
				{nonParticipants.map(item => {
					return (
						<UniversalListItem id={item.id} text={item.name} key={item.id} isCheckbox={false} />
					);
				})}
			</div>
		);
	},
});

export default PurchaseInfo;
