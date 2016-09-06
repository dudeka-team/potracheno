import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {CircularProgress} from 'material-ui';

import {createPurchaseAsync} from '../actions/createPurchase';
import {loadEventDataAsync} from '../actions';

import {Page, PageContent} from '../components/Page';
import Separator from '../components/Separator';
import NewPurchasePayer from '../components/NewPurchasePayer';
import Popup from '../components/Popup';
import Payers from '../components/Payers';
import BlueSubtitle from '../components/BlueSubtitle';
import UniversalListItem from '../components/UniversalListItem';
import Input from '../components/Input';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import fetchEventData from '../actions/fetchEventData';
import fetchPurchaseChange from '../actions/fetchPurchaseChange';

const EDIT = 'EDIT';
const CREATE = 'CREATE';

const {assign} = Object;

const NewPurchasePage = React.createClass({
	getInitialState() {
		const {currentEvent} = this.props;
		const purchase = {
			participants: (currentEvent && currentEvent.participants) || [],
			payer: currentEvent && currentEvent.participants && currentEvent.participants[0],
		};

		return {
			mode: this.props.mode || CREATE,
			isSavingData: false,
			purchase,
			eventParticipants: (currentEvent && currentEvent.participants) || [],
		};
	},

	componentDidMount() {
		const {params, dispatch} = this.props;
		dispatch(fetchEventData(params.id));
	},

	componentWillReceiveProps(newProps) {
		const {currentEvent} = newProps;
		if (!currentEvent || !currentEvent.purchases) return;
		if (this.props.mode !== EDIT) {
			if (!this.props.currentEvent) {
				this.setState({
					eventParticipants: currentEvent.participants,
					purchase: assign(this.state.purchase, {
						payer: currentEvent.participants && currentEvent.participants[0],
						participants: currentEvent.participants,
					}),
				});
			}
			return;
		}
		const purchase = currentEvent.purchases[this.props.params.purchase_id];
		if (!purchase.payer) {
			purchase.payer = purchase.participants[0];
		}
		this.setState({
			purchase,
			eventParticipants: currentEvent.participants,
		});
	},

	getLoan(user) {
		const {purchase} = this.state;
		const count = purchase.participants.length;
		if (!count || purchase.participants.indexOf(user) === -1) {
			return 0;
		}
		return Math.round((purchase.amount || 0) / count);
	},

	save() {
		const {state, props} = this;
		props.dispatch(createPurchaseAsync({
			eventId: this.props.params.id,
			purchaseData: state.purchase,
		}));
		this.setState({
			isSavingData: true,
		});
	},

	goToEvent() {
		this.props.router.push(`/events/${this.props.params.id}`);
		this.props.dispatch(loadEventDataAsync(this.props.params.id));
	},

	saveChanges() {
		const {props, state} = this;
		const {dispatch} = props;
		const {purchase_id, id} = props.params;
		dispatch(fetchPurchaseChange(id, purchase_id, state.purchase));
		this.setState({
			isSavingData: true,
		});
	},

	createPageTopBar() {
		const {purchase} = this.state;
		let disabled = purchase.participants.length === 0 || isNaN(purchase.amount) || !purchase.amount;
		return (
			<TopBar>
				<TopBarIcon icon="arrow-back" onClick={this.goToEvent} />
				<TopBarHeading title="Новая покупка" />
				{this.state.isSavingData ?
					<CircularProgress size={0.3} />
					:
					<TopBarIcon disabled={disabled} icon="check-active" onClick={this.save} />
				}
			</TopBar>
		);
	},

	editPageTopBar() {
		const {purchase} = this.state;
		let disabled = purchase.participants.length === 0 || isNaN(purchase.amount) || !purchase.amount;
		return (
			<TopBar>
				<TopBarIcon icon="arrow-back" onClick={this.goToEvent} />
				<TopBarHeading title="Редактирование покупки" />
				{this.state.isSavingData ?
					<CircularProgress size={0.3} />
					:
					<TopBarIcon disabled={disabled} icon="check-active" onClick={this.saveChanges} />
				}
			</TopBar>
		);
	},

	render() {
		const {state} = this;
		const {mode} = state;
		const {purchase} = state;

		return (
			<Page>
				{mode === EDIT && this.editPageTopBar()}
				{mode === CREATE && this.createPageTopBar()}
				<PageContent>
					<NewPurchasePayer
						payer={purchase.payer || ''}
						onClick={() => this.setState({popupOpened: true})}
					/>
					{state.popupOpened &&
						<Popup
							title="Кто платит"
							closeIcon
							onClose={() => this.setState({popupOpened: false})}
						>
							<Payers
								participants={state.eventParticipants}
								payer={purchase.payer}
								changePayer={user => {
									this.setState({
										purchase: assign(purchase, {payer: user}),
										popupOpened: false,
									});
								}}
							/>
						</Popup>
					}
					<Separator />
					<div style={{padding: '16px 16px 14px 16px'}}>
						<Input
							type="number"
							hint="0 руб."
							size="large"
							label="Сумма"
							labelFixed
							labelSize="small"
							value={(mode === EDIT && purchase) ? purchase.amount || '' : ''}
							onChange={
								event => {
									const amount = Number(event.target.value);
									if (isNaN(amount)) {
										return;
									}
									purchase.amount = amount;
									this.setState({purchase});
								}
							}
						/>
						<Input
							label="Название покупки"
							value={(mode === EDIT && purchase) ? purchase.name : ''}
							onChange={event => {
								purchase.name = event.target.value;
								this.setState({purchase});
							}}
						/>
					</div>
					<Separator />
					<div>
						<BlueSubtitle text="Участники покупки" />
						{state.eventParticipants
							.map(user => {
								return (<UniversalListItem
									id={user}
									key={user}
									text={user}
									price={this.getLoan(user)}
									isCheckBox
									checkBoxChecked={purchase.participants.indexOf(user) !== -1}
									isBordered
									onClick={() => {
										const {participants} = purchase;
										if (participants.indexOf(user) !== -1) {
											purchase.participants = participants.filter(x => x !== user);
										} else {
											participants.push(user);
										}
										this.setState({purchase});
									}}
								/>);
							})
						}
					</div>
				</PageContent>
			</Page>
		);
	},
});

function mapStateToProps({events}) {
	return {
		currentEvent: events.currentEvent,
		isFetchingEvent: events.isFetchingEvent,
	};
}

export default withRouter(connect(mapStateToProps)(NewPurchasePage));
