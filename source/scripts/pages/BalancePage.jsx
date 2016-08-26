import React from 'react';
import BlueSubtitle from '../components/BlueSubtitle';
import List from '../components/List';
import BalanceListItem from '../components/BalanceListItem';

let purchases = [
	{	
		owner: 'Дамир',
		members: ['Дамир', 'Дан', 'Костя', 'Андрей', 'Юра', 'Женя'],
		sum: 4000,
		id: 1,
	},
	{	
		owner: 'Костя',
		members: ['Дамир', 'Дан', 'Костя', 'Андрей', 'Юра', 'Женя'],
		sum: 3000,
		id: 2,
	},
];

let curUser = {
	name: 'Дамир',
};

export default function BalancePage() {
	return (
		<div className="balance-page">
			<BlueSubtitle text="Ваш баланс"/>
			<List>
				<BalanceListItem data={purchases} curUser={curUser} />
			</List>
			<BlueSubtitle text="Баланс участников"/>
			<List>
				<BalanceListItem data={purchases} curUser={curUser} />
			</List>
		</div>
	);
}
