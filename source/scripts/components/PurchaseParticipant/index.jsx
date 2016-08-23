import React from 'react';
import Chip from 'material-ui/Chip';

export function PurchaseParticipant(props) {
	return (
		<div className='purchase-participant'>
			<p className='purchase-participant__name'> {props.name} </p>
            <div className='purchase-participant__delete-button'></div>
		</div>
	);
}

export function AddParticipantButton(props) {
	return (
		<div className='purchase-participant__add-button'>
			Добавить
		</div>
	);
}