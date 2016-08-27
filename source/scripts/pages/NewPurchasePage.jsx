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
		loan: 500,
	},
	{
		name: 'Юрий',
		loan: 500,
	},
	{
		name: 'Алексей',
		loan: 500,
	},
	{
		name: 'Дамир',
		loan: 500,
	},
];

const NewPurchasePage = React.createClass({
	getInitialState() {
		return {
			popupOpened: false,
		};
	},

	openPopup() {
		this.setState({
			popupOpened: true,
		});
	},

	closePopup() {
		this.setState({
			popupOpened: false,
		});
	},

	changePayer() {
		this.setState({
			popupOpened: false,
		});
	},

	render() {
		const {state} = this;
		return (
			<div>
				{
					state.popupOpened && (
						<Popup
							title="Кто платит"
							closeIcon
							okButton={{
								text: 'Добавить',
								onClick: this.closePopup,
							}}
							cancelButton={{
								text: 'Отменить',
								onClick: this.closePopup,
							}}
							onClose={this.closePopup}
						>
							<Payers changePayer={this.changePayer} />
						</Popup>
					)
				}
				<PurchaseParticipants
					payer={this.state.payer}
					onClick={() => {
						this.setState({
							popupOpened: true,
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
