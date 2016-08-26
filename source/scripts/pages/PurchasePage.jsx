import React from 'react';
import PurchaseInfo from '../components/PurchaseInfo';
import Popup from '../components/Popup';

const PurchasePage = React.createClass({
	render() {
		return (
			<div>
				<Popup
					title="Шашлык"
					npmcloseIcon
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
	},
});

export default PurchasePage;
