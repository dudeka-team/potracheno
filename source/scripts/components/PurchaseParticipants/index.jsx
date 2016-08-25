import React from 'react';
import Chip from '../Chip';
import ChipAddButton from '../ChipAddButton';

export default function PurchaseParticipants(props) {
	return (
		<div>
			<div className='purchase-participants'>
				<p className='purchase-participants__title'> Кто оплачивает </p>
				<div className='purchase-participants__list'>
					<Chip name="Дамир (Вы)" />
					<ChipAddButton />
				</div>
			</div>
		</div>
	);
}