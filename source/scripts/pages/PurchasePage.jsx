import React from 'react';
import PurchaseList from '../components/PurchaseList';
import PurchaseInfo from '../components/PurchaseInfo';
import Popup from '../components/Popup';
const PurchasePage = React.createClass({
	render() {
		return (
			<div>
				<PurchaseList />
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
	},
});

export default PurchasePage;
