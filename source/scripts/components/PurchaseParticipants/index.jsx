import React from 'react';
import { PurchaseParticipant, AddParticipantButton } from '../PurchaseParticipant';
import Separator from '../Separator';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

export default function PurchaseParticipants(props) {
	return (
		<div>
			<div className='purchase-participants'>
				<p className='purchase-participants__title'> Кто оплачивает </p>
				<div className='purchase-participants__list'>
					<PurchaseParticipant name="Дамир (Вы)" />
					<AddParticipantButton />
				</div>
			</div>
			<Separator />
			<div className='purchase-inputs'>
				<TextField
					hintText="1000 P"
					floatingLabelText="Сумма"
					inputStyle={
						{
							marginTop: '0px',
							fontSize: '30px'
						}
					}
					hintStyle={
						{
							fontSize: '30px'
						}
					}
				/>
			</div>
		</div>
	);
}