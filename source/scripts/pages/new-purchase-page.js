import React, { Component } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import deepEqual from 'deep-equal';
import assign from 'object-assign';

import { createPurchaseAsync } from '../actions/createPurchase';
import { createEventActionAsync, eventActionTypes, getDiff } from '../actions/createEventAction';
import { loadEventDataAsync } from '../actions';

import { Page, PageContent } from '../components/Page';
import Separator from '../components/Separator';
import NewPurchasePayer from '../components/NewPurchasePayer';
import Popup from '../components/popup';
import Payers from '../components/Payers';
import GreySubtitle from '../components/GreySubtitle';
import UniversalListItem from '../components/universal-list-item';
import { TopBar, TopBarHeading, TopBarIcon } from '../components/TopBar';
import FormRow from '../components/form-row';
import FormLabel from '../components/form-label';
import FormInput from '../components/form-input';
import Spinner from '../components/spinner';
import IconCross from '../components/icons/cross';
import Checkbox from '../components/checkbox';

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

import styles from './new-purchase-page.css';

const EDIT = 'EDIT';
const CREATE = 'CREATE';

class NewPurchasePage extends Component {
	constructor(props) {
		super(props);

		const { eventParticipants, purchase, myName } = props.data;
		let purchaseCopy;

		if (props.mode === EDIT) {
			purchaseCopy = {
				...purchase,
				participants: purchase.participants.slice(),
			};
		}

		this.state = {
			mode: props.mode || CREATE,
			isSavingData: false,
			purchase,
			eventParticipants,
			myName,
			purchaseCopy,
		};
	}

	componentDidMount() {
		const { params, dispatch } = this.props;
		dispatch(fetchEventData(params.id));
	}

	getLoan = (user) => {
		const { purchase } = this.state;
		const count = purchase.participants.length;
		if (!count || purchase.participants.indexOf(user) === -1) {
			return 0;
		}
		return Math.round((purchase.amount || 0) / count);
	};

	getFullName = (name) => (this.state.myName === name ? `${name} (Вы)` : name);

	save = () => {
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
	};

	goToEvent = () => {
		this.props.router.push(`/events/${this.props.params.id}`);
		this.props.dispatch(loadEventDataAsync(this.props.params.id));
	};

	saveChanges = () => {
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
	};

	editPageTopBar = () => {
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
					<Spinner className={styles.spinner} />
					:
					<TopBarIcon disabled={disabled} icon="check-active" onClick={this.saveChanges} />
				}
			</TopBar>
		);
	};

	createPageTopBar = () => {
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
					<Spinner className={styles.spinner} />
					:
					<TopBarIcon disabled={disabled} icon="check-active" onClick={this.save} />
				}
			</TopBar>
		);
	};

	deletePurchase = () => {
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
	};

	handleChangePurchasePrice = (event) => {
		const amount = Number(event.target.value);

		this.setState((state) => ({
			purchase: Object.assign({}, state.purchase, { amount }),
		}));
	};

	handleChangePurchaseName = (event) => {
		const name = event.target.value;

		this.setState((state) => ({
			purchase: {
				...state.purchase,
				name,
			},
		}));
	};

	handleClickEventParticipant = (user) => () => {
		const { mode, purchase } = this.state;
		const { participants } = purchase;
		const { hasRepayedDebts } = this.props;

		if (mode === EDIT && hasRepayedDebts) return;

		if (participants.indexOf(user) !== -1) {
			purchase.participants = participants.filter(x => x !== user);
		} else {
			participants.push(user);
		}

		this.setState({ purchase });
	};

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
								value={purchase ? purchase.name : ''}
								onChange={this.handleChangePurchaseName}
							/>
						</FormRow>
					</div>

					<Separator />

					<div style={{ paddingRight: '9px' }}>
						<GreySubtitle text="Участники покупки" />

						{state.eventParticipants.map((user) => (
							<UniversalListItem
								isBordered
								key={user}
								prefix={
									<Checkbox
										disabled={mode === EDIT && hasRepayedDebts}
										checked={purchase.participants.indexOf(user) !== -1}
									/>
								}
								postfix={`${this.getLoan(user)} Р`}
								onClick={this.handleClickEventParticipant(user)}
							>
								{this.getFullName(user)}
							</UniversalListItem>
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

							{!hasRepayedDebts && <Separator />}
							{!hasRepayedDebts && <UniversalListItem
								prefix={<IconCross />}
								onClick={() => this.setState({ popupDeleteOpened: true })}
							>
								Удалить покупку
							</UniversalListItem>}

							<Separator />
						</div>
					}
				</PageContent>
			</Page>
		);
	}
}

function mapStateToProps({ events }) {
	return {
		hasRepayedDebts: Boolean(events.currentEvent.repayedDebts),
		isFetchingEvent: events.isFetchingEvent,
		localEvents: events.localEvents,
	};
}

export default withRouter(connect(mapStateToProps)(NewPurchasePage));
