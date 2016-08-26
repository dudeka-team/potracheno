import React from 'react';
import PurchaseInfo from '../components/PurchaseInfo';
import Popup from '../components/Popup';

export default function PurchasePage() {
	return (
		<div>
			<Popup
				title="Шашлык"
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
				<PurchaseInfo />
			</Popup>
		</div>
	);
}
