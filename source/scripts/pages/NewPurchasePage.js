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

const NewPurchasePage = React.createClass({
	getInitialState() {
		let participants = [];
		const {currentEvent} = this.props;
		if (currentEvent && currentEvent.participants) {
			participants = currentEvent.participants.map(userName => ({
				participate: true,
				name: userName,
				loan: 0,
			}));
		}
		const payer = participants[0];
		return {
			popupOpened: false,
			payer,
			participants,
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
		const participants = this.state.participants;
		participants.forEach((user) => {
			user.isPayer = (user.name === payer.name);
		});
		this.setState({
			participants,
			popupOpened: false,
			payer,
		});
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
			eventId: this.props.params.id,
			purchaseData: {
				name: state.name,
				amount: state.amount,
				payer: state.payer.name,
				participants: state.participants.filter(user => user.participate).map(user => user.name),
			},
		}));
		this.setState({
			isSavingData: true,
		});
	},

	goToEvent() {
		this.props.router.push(`/events/${this.props.params.id}`);
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
						<Payers payers={this.state.participants} changePayer={this.changePayer} />
					</Popup>
				}
				<NewPurchasePayer
					payer={state.payer ? state.payer.name : ''}
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
									id={index}
									key={index}
									text={user.name}
									price={Math.round(user.loan * 10) / 10}
									isCheckBox
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
