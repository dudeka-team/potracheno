import React from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import deepEqual from 'deep-equal';
import assign from 'object-assign';

import CircularProgress from 'material-ui/CircularProgress';

import { createPurchaseAsync } from '../actions/createPurchase';
import { createEventActionAsync, eventActionTypes, getDiff } from '../actions/createEventAction';
import { loadEventDataAsync } from '../actions';

import { Page, PageContent } from '../components/Page';
import Separator from '../components/Separator';
import NewPurchasePayer from '../components/NewPurchasePayer';
import Popup from '../components/Popup';
import Payers from '../components/Payers';
import GreySubtitle from '../components/GreySubtitle';
import UniversalListItem from '../components/UniversalListItem';
import { TopBar, TopBarHeading, TopBarIcon } from '../components/TopBar';
import FormRow from '../components/form-row/form-row';
import FormLabel from '../components/form-label/form-label';
import FormInput from '../components/form-input/form-input';

import fetchEventData from '../actions/fetchEventData';
import fetchPurchaseChange from '../actions/fetchPurchaseChange';
import fetchPurchaseDelete from '../actions/fetchPurchaseDelete';

import {
	getUserType,
	reachGoal,
	hasCreatedPurchase,
	markPurchaseCreation,
	CREATE_FIRST_PURCHASE,
	INDEPENDENT,
} from '../modules/metrics';

const EDIT = 'EDIT';
const CREATE = 'CREATE';

const NewPurchasePage = React.createClass({
	getInitialState() {
		const { props } = this;
		const { eventParticipants, purchase, myName } = props.data;
		let purchaseCopy;
		if (props.mode === EDIT) {
			purchaseCopy = assign({}, purchase, {
				participants: purchase.participants.slice(),
			});
		}
		return {
			mode: props.mode || CREATE,
			isSavingData: false,
			purchase,
			eventParticipants,
			myName,
			purchaseCopy,
		};
	},

	componentDidMount() {
		const { params, dispatch } = this.props;
		dispatch(fetchEventData(params.id));
	},

	getLoan(user) {
		const { purchase } = this.state;
		const count = purchase.participants.length;
		if (!count || purchase.participants.indexOf(user) === -1) {
			return 0;
		}
		return Math.round((purchase.amount || 0) / count);
	},

	getFullName(name) {
		return this.state.myName === name ? `${name} (Вы)` : name;
	},

	save() {
		const { state, props } = this;
		const { localEvents } = props;

		if (state.mode === CREATE) {
			props.dispatch(createEventActionAsync({
				eventId: props.params.id,
				eventActionInfo: {
					config: eventActionTypes.addPurchase(
						state.purchase.payer,
						state.purchase.name,
						state.purchase.amount,
						(new Date()).getTime()
					),
				},
			}));

			props.dispatch(createEventActionAsync({
				eventId: props.params.id,
				eventActionInfo: {
					config: eventActionTypes.addParticipantsToPurchase(
						localEvents[props.params.id],
						state.purchase.participants.length,
						state.purchase.name,
						(new Date()).getTime()
					),
				},
			}));
		}

		if (getUserType() === INDEPENDENT && !hasCreatedPurchase()) {
			reachGoal(CREATE_FIRST_PURCHASE);
			markPurchaseCreation();
		}

		props.dispatch(createPurchaseAsync({
			eventId: props.params.id,
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
		const { props, state } = this;
		const { dispatch, localEvents } = props;
		const { purchase_id, id } = props.params;

		const participants = getDiff(state.purchaseCopy.participants, state.purchase.participants);
		dispatch(fetchPurchaseChange(id, purchase_id, state.purchase));

		participants.added.forEach((participant) => {
			props.dispatch(createEventActionAsync({
				eventId: props.params.id,
				eventActionInfo: {
					config: eventActionTypes.addParticipantToPurchase(
						localEvents[props.params.id],
						participant,
						state.purchase.name,
						(new Date()).getTime()
					),
				},
			}));
		});

		participants.removed.forEach((participant) => {
			props.dispatch(createEventActionAsync({
				eventId: props.params.id,
				eventActionInfo: {
					config: eventActionTypes.removeParticipantFromPurchase(
						localEvents[props.params.id],
						participant,
						state.purchase.name,
						(new Date()).getTime()
					),
				},
			}));
		});

		this.setState({
			isSavingData: true,
		});
	},

	editPageTopBar() {
		const { purchase, purchaseCopy } = this.state;
		const { participants, name } = purchase;
		const changed = purchase.name !== purchaseCopy.name ||
			purchase.amount !== purchaseCopy.amount ||
			purchase.payer !== purchaseCopy.payer ||
			!deepEqual(purchase.participants.sort(), purchaseCopy.participants.sort());

		const disabled = participants.length === 0 ||
			isNaN(purchase.amount) ||
			!purchase.amount ||
			!(name || '').trim() ||
			!changed;

		return (
			<TopBar bordered>
				<TopBarIcon icon="arrow-back" onClick={this.goToEvent} />
				<TopBarHeading title="Редактирование покупки" />
				{this.state.isSavingData ?
					<CircularProgress size={0.3} color="#ffe151" />
					:
					<TopBarIcon disabled={disabled} icon="check-active" onClick={this.saveChanges} />
				}
			</TopBar>
		);
	},

	createPageTopBar() {
		const { purchase } = this.state;
		const { participants, name } = purchase;
		const disabled = participants.length === 0 ||
			isNaN(purchase.amount) ||
			!purchase.amount ||
			!(name || '').trim();
		return (
			<TopBar bordered>
				<TopBarIcon icon="arrow-back" onClick={this.goToEvent} />
				<TopBarHeading title="Новая покупка" />
				{this.state.isSavingData ?
					<CircularProgress size={0.3} color="#ffe151" />
					:
					<TopBarIcon disabled={disabled} icon="check-active" onClick={this.save} />
				}
			</TopBar>
		);
	},

	deletePurchase() {
		const { state, props } = this;
		const { id, purchase_id } = this.props.params;
		const { dispatch } = this.props;
		props.dispatch(createEventActionAsync({
			eventId: props.params.id,
			eventActionInfo: {
				config: eventActionTypes.deletePurchase(
					props.localEvents[props.params.id],
					state.purchase.name,
					(new Date()).getTime()
				),
			},
		}));
		dispatch(fetchPurchaseDelete(id, purchase_id));
	},

	handleChangePurchasePrice(event) {
		const amount = Number(event.target.value);

		this.setState((state) => ({
			purchase: Object.assign({}, state.purchase, { amount }),
		}));
	},

	handleChangePurchaseName(event) {
		const name = event.target.value;

		this.setState((state) => ({
			purchase: Object.assign({}, state.purchase, { name }),
		}));
	},

	render() {
		const { state, props } = this;
		const { mode, purchase } = state;
		const { hasRepayedDebts } = props;

		return (
			<Page>
				{mode === EDIT && this.editPageTopBar()}
				{mode === CREATE && this.createPageTopBar()}
				<PageContent>
					{mode === EDIT && hasRepayedDebts &&
						<div
							style={{
								paddingLeft: '16px',
								paddingTop: '24px',
								paddingRight: '16px',
								color: 'red',
							}}
						>
							После начала возвращения долгов можно редактировать только название покупки.
						</div>
					}
					<NewPurchasePayer
						payer={this.getFullName(purchase.payer) || ''}
						disabled={hasRepayedDebts}
						onClick={() => {
							if (mode === EDIT && hasRepayedDebts) return;
							this.setState({ popupOpened: true });
						}}
					/>
					{state.popupOpened &&
						<Popup
							title="Кто платит"
							closeIcon
							onClose={() => this.setState({ popupOpened: false })}
						>
							<Payers
								myName={this.props.localEvents[props.params.id]}
								participants={state.eventParticipants}
								payer={purchase.payer}
								getFullName={this.getFullName}
								changePayer={user => {
									this.setState({
										purchase: assign(purchase, { payer: user }),
										popupOpened: false,
									});
								}}
							/>
						</Popup>
					}

					<div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
						<FormRow>
							<FormLabel htmlFor="purchase-price">Сумма, ₽</FormLabel>
							<FormInput
								id="purchase-price"
								type="number"
								size={FormInput.sizes.large}
								disabled={mode === EDIT && hasRepayedDebts}
								value={purchase.amount || 0}
								onChange={this.handleChangePurchasePrice}
							/>
						</FormRow>

						<FormRow>
							<FormLabel htmlFor="purchase-name">Название покупки</FormLabel>
							<FormInput
								id="purchase-name"
								value={(mode === EDIT && purchase) ? purchase.name : ''}
								onChange={this.handleChangePurchaseName}
							/>
						</FormRow>
					</div>

					<Separator />

					<div style={{ paddingRight: '9px' }}>
						<GreySubtitle text="Участники покупки" />
						{state.eventParticipants.map(user => (
							<UniversalListItem
								id={user}
								key={user}
								text={this.getFullName(user)}
								price={this.getLoan(user)}
								isCheckBox
								checkBoxDisabled={mode === EDIT && hasRepayedDebts}
								checkBoxChecked={purchase.participants.indexOf(user) !== -1}
								isBordered
								onClick={() => {
									if (mode === EDIT && hasRepayedDebts) return;
									const { participants } = purchase;
									if (participants.indexOf(user) !== -1) {
										purchase.participants = participants.filter(x => x !== user);
									} else {
										participants.push(user);
									}
									this.setState({ purchase });
								}}
							/>
						))}
					</div>
					{mode === EDIT &&
						<div>
							{state.popupDeleteOpened &&
								<Popup
									unBordered
									largeHeader
									title="Вы уверены?"
									okButton={{
										text: 'удалить',
										onClick: () => { this.deletePurchase(); },
									}}
									cancelButton={{
										text: 'отмена',
										onClick: () => { this.setState({ popupDeleteOpened: false }); },
									}}
								/>
							}

							{!hasRepayedDebts && [
								<Separator key="first" />,
								<UniversalListItem
									isDelete
									key="second"
									text="Удалить покупку"
									onClick={() => this.setState({ popupDeleteOpened: true })}
								/>,
							]}

							<Separator />
						</div>
					}
				</PageContent>
			</Page>
		);
	},
});

function mapStateToProps({ events }) {
	return {
		hasRepayedDebts: Boolean(events.currentEvent.repayedDebts),
		isFetchingEvent: events.isFetchingEvent,
		localEvents: events.localEvents,
	};
}

export default withRouter(connect(mapStateToProps)(NewPurchasePage));
