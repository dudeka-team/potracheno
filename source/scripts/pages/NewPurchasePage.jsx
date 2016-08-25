import React from 'react';
import PurchaseParticipants from '../components/PurchaseParticipants';
import Separator from '../components/Separator';
import NewPurchaseInputs from '../components/NewPurchaseInputs';

export default function(props) {
	return (
		<div>
			<PurchaseParticipants />
			<Separator />
			<NewPurchaseInputs />
			<Separator />
		</div>
	);
}