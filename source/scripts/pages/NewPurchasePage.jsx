import React from 'react';
import PurchaseParticipants from '../components/PurchaseParticipants';
import Separator from '../components/Separator';
import NewPurchaseInputs from '../components/NewPurchaseInputs';
import NewPurchaseParticipants from '../components/NewPurchaseParticipants';

var mockUsers = [
	{
		name: 'Дамир',
		loan: '500'
	},
	{
		name: 'Юрий',
		loan: '500'
	},
	{
		name: 'Алексей',
		loan: '500'
	},
	{
		name: 'Дамир',
		loan: '500'
	}
];

export default function(props) {
	return (
		<div>
			<PurchaseParticipants payer='Дамир'/>
			<Separator />
			<NewPurchaseInputs />
			<Separator />
			<NewPurchaseParticipants users={mockUsers} />
		</div>
	);
}