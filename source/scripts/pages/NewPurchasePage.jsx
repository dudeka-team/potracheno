import React from 'react';
import PurchaseParticipants from '../components/PurchaseParticipants';
import Separator from '../components/Separator';
import NewPurchaseInputs from '../components/NewPurchaseInputs';
import NewPurchaseParticipants from '../components/NewPurchaseParticipants';
import Popup from '../components/Popup';
import Payers from '../components/Payers';

let mockUsers = [
	{
		name: 'Дамир',
		loan: '500',
	},
	{
		name: 'Юрий',
		loan: '500',
	},
	{
		name: 'Алексей',
		loan: '500',
	},
	{
		name: 'Дамир',
		loan: '500',
	},
];

const NewPurchasePage = React.createClass({
	getInitialState() {
		return {
			popup: false,
		};
	},
	changePayer(e) {
		this.setState({
			popup: false,
			payer: e.target.innerHTML,
		});
	},
	render() {
		return (
			<div>
				{
				this.state.popup && (
					<Popup title="Кто оплачивает">
						<Payers changePayer={this.changePayer} />
					</Popup>
				)
				}
				<PurchaseParticipants
					payer={this.state.payer}
					onClick={() => {
						this.setState({
							popup: true,
						});
					}}
				/>
				<Separator />
				<NewPurchaseInputs />
				<Separator />
				<NewPurchaseParticipants users={mockUsers} />
			</div>
		);
	},
});

export default NewPurchasePage;
