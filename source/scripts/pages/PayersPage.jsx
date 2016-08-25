import React from 'react';
import Popup from '../components/Popup';
import Payers from '../components/Payers';

const PayersPage = React.createClass({
	render() {
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
					<Payers />
				</Popup>
			</div>
		);
	},
});

export default PayersPage;
