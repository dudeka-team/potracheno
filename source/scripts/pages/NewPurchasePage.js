import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {CircularProgress} from 'material-ui';

import {createPurchaseAsync} from '../actions/createPurchase';

import Separator from '../components/Separator';
import NewPurchasePayer from '../components/NewPurchasePayer';
import Popup from '../components/Popup';
import Payers from '../components/Payers';
import BlueSubtitle from '../components/BlueSubtitle';
import UniversalListItem from '../components/UniversalListItem';
import Input from '../components/Input';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';


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

const NewPurchasePage = React.createClass({
	getInitialState() {
		return {
			popupOpened: false,
			payer: {id: 0, name: 'Дамир (Вы)'},
			participants: mockUsers,
			amount: 0,
			name: '',
			isSavingData: false,
			currentEvent: null,
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
			eventId: this.props.currentEvent.id,
			purchaseData: {
				name: state.name,
				amount: state.amount,
				participants: state.participants,
			},
		}));
		this.setState({
			isSavingData: true,
		});
	},

	goToEvent() {
		this.props.router.push(`/events/${this.props.currentEvent.id}`);
	},

	render() {
		const {state} = this;
		return (
			<div>
				<TopBar>
					<TopBarIcon icon="arrow-back" onClick={this.goToEvent} />
					<TopBarHeading title="Новая покупка" />
					{state.isSavingData ?
						<CircularProgress size={0.3} />
						:
						<TopBarIcon icon="check-active" onClick={this.save} />
					}

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
						type="number"
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

function mapStateToProps(state) {
	return {
		currentEvent: state.app.currentEvent,
	};
}

export default withRouter(connect(mapStateToProps)(NewPurchasePage));
