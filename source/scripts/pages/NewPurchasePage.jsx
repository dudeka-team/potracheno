import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import Separator from '../components/Separator';
import NewPurchasePayer from '../components/NewPurchasePayer';
import Popup from '../components/Popup';
import Payers from '../components/Payers';
import BlueSubtitle from '../components/BlueSubtitle';
import UniversalListItem from '../components/UniversalListItem';
import Input from '../components/Input';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import {createPurchaseAsync} from '../actions';

const mockUsers = [
	{
		id: 0,
		name: 'Дамир',
		isPayer: true,
		participate: true,
		loan: 0,
	},
	{
		id: 1,
		name: 'Юрий',
		isPayer: false,
		participate: true,
		loan: 0,
	},
	{
		id: 2,
		name: 'Алексей',
		isPayer: false,
		participate: true,
		loan: 0,
	},
	{
		id: 3,
		name: 'Дамир',
		isPayer: false,
		participate: true,
		loan: 0,
	},
];

function goToEvent() {
	hashHistory.push('/event');
}

const NewPurchasePage = React.createClass({
	getInitialState() {
		return {
			popupOpened: false,
			payer: {id: 0, name: 'Дамир (Вы)'},
			participants: mockUsers,
			amount: 0,
			name: '',
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
			payer,
		});
		const participants = this.state.participants;
		participants.forEach((user) => {
			user.isPayer = (user.id === payer.id);
		});
		this.setState({participants});
	},

	calcLoans(amount) {
		const participants = this.state.participants;
		const participantsCount = participants.filter(user => user.participate).length;

		if (amount === undefined) {
			amount = this.state.amount;
		}

		participants.forEach((user) => {
			user.loan = user.participate ? amount / participantsCount : 0;
		});
		this.setState({participants, amount});
	},

	save() {
		const {state, props} = this;
		props.dispatch(createPurchaseAsync({
			name: state.name,
			amount: state.amount,
			participants: state.participants,
		}));
		goToEvent();
	},

	render() {
		const {state} = this;
		return (
			<div>
				<TopBar>
					<TopBarIcon icon="arrow-back" />
					<TopBarHeading title="Новая покупка" />
					<TopBarIcon icon="check-active" onClick={this.save} />
				</TopBar>
				{
					state.popupOpened && <Popup
						title="Кто платит"
						closeIcon
						onClose={this.closePopup}
					>
						<Payers payers={mockUsers} changePayer={this.changePayer} />
					</Popup>
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
				<div style={{padding: '16px 16px 14px 16px'}}>
					<Input
						hint="0 руб."
						style={{
							fontSize: '30px',
							marginTop: '20px',
						}}
						label="Сумма"
						labelStyle={{
							top: '-21px',
							fontSize: '12px',
							color: '#818f99',
							opacity: '0',
							transition: 'opacity 0.15s',
						}}
						labelTransform={{
							opacity: '1',
						}}
						onChange={
							event => {
								const amount = Number(event.target.value);
								if (isNaN(amount)) {
									return;
								}
								this.calcLoans(amount);
							}
						}
					/>
					<Input
						style={{
							marginTop: '42px',
							fontSize: '16px',
						}}
						label="Название покупки"
						labelTransform={{
							transform: 'scale(0.75) translateY(-24px)',
							color: '#818f99',
						}}
						onChange={event => this.setState({name: event.target.value})}
					/>
				</div>
				<Separator />
				<div>
					<BlueSubtitle text="Участники покупки" />
					{
						this.state.participants
							.map((user, index) => {
								return (<UniversalListItem
									id={user.id}
									key={index}
									text={user.name}
									price={Math.round(user.loan * 10) / 10}
									isCheckbox
									checkBoxChecked={user.participate}
									onClick={
										() => {
											user.participate = !user.participate;
											this.setState({
												participants: this.state.participants,
											});
											this.calcLoans();
										}
									}
									isBordered
									style={{
										padding: '18px 19px 18px 16px',
									}}
								/>);
							})
					}
				</div>
			</div>
		);
	},
});

export default connect()(NewPurchasePage);
