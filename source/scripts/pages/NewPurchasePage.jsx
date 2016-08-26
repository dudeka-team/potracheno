import React from 'react';
import PurchaseParticipants from '../components/PurchaseParticipants';
import Separator from '../components/Separator';
import NewPurchaseInputs from '../components/NewPurchaseInputs';
import NewPurchaseParticipants from '../components/NewPurchaseParticipants';
import Popup from '../components/Popup';
import Payers from '../components/Payers';

var mockUsers = [
	{
		name: 'Дамир',
		loan: '500'
	},
	{
		name: 'Юрий',
		loan: '500'
	},
	{
		name: 'Алексей',
		loan: '500'
	},
	{
		name: 'Дамир',
		loan: '500'
	}
];

export default class NewPurchasePage extends React.Component {
	constructor(props) {
		super();
		this.state = {
			popup: false
		}
	}
	changePayer(e) {
		console.log(e.target.state)
		this.setState({
			popup: false,
			payer: e.target.innerHTML
		})
	}
	render() {
		return (
			<div>
				{
					this.state.popup &&  (
						<Popup title="Кто оплачивает">
							<Payers changePayer={this.changePayer.bind(this)} />
						</Popup>
					)
				}
				<PurchaseParticipants
					payer={this.state.payer}
					onClick={() => {
						this.setState({
							popup: true
						});
					}}
				/>
				<Separator />
				<NewPurchaseInputs />
				<Separator />
				<NewPurchaseParticipants users={mockUsers} />
			</div>
		);
	}
}