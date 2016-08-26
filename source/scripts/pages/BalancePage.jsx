import React from 'react';
import BlueSubtitle from '../components/BlueSubtitle';
import List from '../components/List';
import BalanceListItem from '../components/BalanceListItem';

let purchases = [
	{	
		owner: 'Дамир',
		members: ['Дамир', 'Дан', 'Костя', 'Андрей', 'Юра', 'Женя'],
		sum: 4000,
		id: 0,
	},
	{	
		owner: 'Костя',
		members: ['Дамир', 'Дан', 'Костя', 'Андрей', 'Юра', 'Женя'],
		sum: 3000,
		id: 1,
	},
];

let curUser = {
	name: 'Дамир',
};

let eventUsers = [
	{
		name: 'Дамир',
		id: 0,
	},
	{
		name: 'Женя',
		id: 1,
	},
	{
		name: 'Дан',
		id: 2,
	},
	{
		name: 'Андрей',
		id: 3,
	},
	{
		name: 'Костя',
		id: 4,
	},
	{
		name: 'Юра',
		id: 5,
	},
];

let event = {
	id: 1001,
	title: 'Шашлык у Дамира',
	dateStart: '21.01.07',
	dateEnd: '21.01.07',
	members: [
		{
			name: 'Дамир',
			debts: [
				{
					sum: 0,
					direction: null,
				}
			],
			id: 1101,
		},
		{
			name: 'Костя',
			debts: [
				{
					sum: 1500,
					direction: {},
				}
			],
			id: 1102,
		}
	],
	purchases: [
		{
			title: 'Мясо на шашлык',
			sum: 3000,
			owner: {
				name: 'Дамир',
				debts: [
					{
						sum: 0,
						direction: null,
					}
			],
				id: 1101,
			},
			members: [
				{
					name: 'Дамир',
					debts: [
						{
							sum: 0,
							direction: null,
						}
			],
					id: 1101,
				},
				{
					name: 'Костя',
					debts: [
						{
							sum: 0,
							direction: null,
						}
			],
					id: 1102,
				}
			],
		}
	]
};

export default function BalancePage() {
	return (
		<div className="balance-page">
			<BlueSubtitle text="Ваш баланс"/>
			<List>
				<BalanceListItem data={purchases} curUser={curUser} eventUsers={eventUsers} />
			</List>
			<BlueSubtitle text="Баланс участников"/>
		</div>
	);
}
