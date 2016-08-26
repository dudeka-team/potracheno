import React from 'react';
import Popup from '../components/Popup';
import Payers from '../components/Payers';


export default function PayersPage() {
	return (
		<div>
			<Popup
				title="Кто платит"
				closeIcon
				okButton={{
					text: 'Добавить',
					onClick: () => {},
				}}
				cancelButton={{
					text: 'Отменить',
					onClick: () => {},
				}}
			>
				<Payers />
			</Popup>
		</div>
	);
}
