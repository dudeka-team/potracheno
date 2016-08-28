import React from 'react';
import NewPurchaseParticipants from '../components/NewPurchaseParticipants';
import Separator from '../components/Separator';
import NewPurchaseInputs from '../components/NewPurchaseInputs';
import NewPurchasePayer from '../components/NewPurchasePayer';
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

var payers = [
	{
		name: 'Дамир (Вы)',
		id: 0,
		chosed: true
	},
	{
		name: 'Петя',
		id: 1,
	},
	{
		name: 'Вася',
		id: 2,
	},
	{
		name: 'Катя',
		id: 3,
	},
	{
		name: 'Вася',
		id: 4,
	},
	{
		name: 'Катя',
		id: 5,
	},
	{
		name: 'Вася',
		id: 6,
	},
	{
		name: 'Катя',
		id: 7,
	},
];

const NewPurchasePage = React.createClass({
	getInitialState() {
		return {
			popupOpened: false,
			payer: {id: 0, name: 'Дамир (Вы)'}
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

	changePayer(payer) {
		this.setState({
			popupOpened: false,
			payer
		});
		payers.forEach((item) => {
			item.chosed = false;
		});
		payers[payer.id].chosed = true;
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
							<Payers payers={payers} changePayer={this.changePayer} />
						</Popup>
					)
				}
				<NewPurchasePayer
					payer={this.state.payer.name}
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
