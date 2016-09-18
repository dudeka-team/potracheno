import React from 'react';
import withRouter from 'react-router/lib/withRouter';
import {connect} from 'react-redux';
import assign from 'object-assign';
import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';
import Portal from 'react-portal';

import {Page} from '../../components/Page';
import FlexContainer from '../../components/FlexContainer';
import Tabs from '../../components/Tabs';
import {TopBar, TopBarHeading, TopBarIcon} from '../../components/TopBar';
import Menu from '../../components/Menu';
import Popup from '../../components/Popup';
import PopupPoster from '../../components/PopupPoster';
import ShareLink from '../../components/ShareLink';

import Balance from './Balance';
import Purchases from './Purchases';

import EventActions from './EventActions';

import fetchEventData from '../../actions/fetchEventData';
import relogin from '../../actions/relogin';

import {DRAWER_SWIPE_AREA_WIDTH} from '../../constants';

const EventPage = React.createClass({
	getInitialState() {
		return {
			menuOpen: false,
			sharePopupOpened: false,
			showShareResult: false,
			shareResultMessage: '',
		};
	},

	componentDidMount() {
		const {id, dispatch} = this.props;
		dispatch(fetchEventData(id));
	},

	goToEvents() {
		this.props.router.push('/events');
	},

	toggleMenu() {
		this.setState({menuOpen: !this.state.menuOpen});
	},

	openSharePopup() {
		this.setState({
			sharePopupOpened: true,
		});
	},

	closeSharePopup() {
		this.setState({
			sharePopupOpened: false,
		});
	},

	goToEdit() {
		const {router} = this.props;
		router.push(`/events/${this.props.id}/edit`);
	},

	handleRelogin() {
		const {id, dispatch} = this.props;
		dispatch(relogin(id));
	},

	formatSubtitle(currentEvent) {
		const participantsStatus = `${currentEvent.participants.length} участников`;
		const formattedStart = moment(currentEvent.start).format('DD MMMM');
		const formattedEnd = moment(currentEvent.end).format('DD MMMM');
		let formattedDate;

		if (formattedStart === formattedEnd) {
			formattedDate = formattedStart;
		} else {
			formattedDate = `${formattedStart}–${formattedEnd}`;
		}

		return `${participantsStatus} • ${formattedDate}`;
	},

	handleShareLinkCopy(copiedSuccessfully) {
		const message = copiedSuccessfully ?
			'Ссылка&nbsp;скопирована в&nbsp;буфер обмена'
			:
			// eslint-disable-next-line max-len
			'Устройство не&nbsp;поддерживает автоматическое копирование. Пожалуйста, скопируйте выделенный текст сами';

		this.setState({
			sharePopupOpened: !copiedSuccessfully,
			showShareResult: true,
			shareResultMessage: message,
		});

		setTimeout(() => {
			this.setState({
				showShareResult: false,
			});
		}, 2000);
	},

	renderPreloader() {
		return (
			<FlexContainer alignItems="center" justifyContent="center" fullHeight>
				<CircularProgress color="#ffe151" />
			</FlexContainer>
		);
	},

	renderDrawer(currentEvent, currentUserName, subtitle) {
		return (
			<Drawer
				onRequestChange={(menuOpen) => this.setState({menuOpen})}
				docked={false}
				swipeAreaWidth={DRAWER_SWIPE_AREA_WIDTH}
				open={this.state.menuOpen}
				openSecondary
			>
				<Menu
					currentEvent={currentEvent}
					currentUserName={currentUserName}
					subtitle={subtitle}
					handleEdit={this.goToEdit}
					handleRelogin={this.handleRelogin}
				/>
			</Drawer>
		);
	},

	renderTopBar(eventName) {
		return (
			<TopBar>
				<TopBarIcon icon="arrow-back" onClick={this.goToEvents} />
				<TopBarHeading
					title={eventName}
				/>
				<TopBarIcon icon="share" onClick={this.openSharePopup} />
				<TopBarIcon icon="burger" onClick={this.toggleMenu} />
			</TopBar>
		);
	},

	renderSharePopup() {
		const {state} = this;

		return (
			<Portal isOpened={state.sharePopupOpened}>
				<Popup
					closeIcon
					title="Поделиться ссылкой"
					onClose={this.closeSharePopup}
				>
					<ShareLink
						link={window.location.href}
						onCopy={this.handleShareLinkCopy}
					/>
				</Popup>
			</Portal>
		);
	},

	render() {
		const {props, state} = this;
		const {currentEvent, currentUserName, isFetchingEvent} = props;
		const purchases = Object
			.keys((currentEvent && currentEvent.purchases) || [])
			.map((purchaseId) => assign({id: purchaseId}, currentEvent.purchases[purchaseId]));
		const actions = Object
			.keys((currentEvent && currentEvent.actions) || [])
			.map((config) => assign({config}, currentEvent.actions[config]));

		if (isFetchingEvent) {
			return this.renderPreloader();
		}

		if (currentEvent) {
			const subtitle = this.formatSubtitle(currentEvent);

			return (
				<Page>
					{this.renderDrawer(currentEvent, currentUserName, subtitle)}
					{this.renderTopBar(currentEvent.name)}
					{this.renderSharePopup()}
					<PopupPoster
						text={state.shareResultMessage}
						isOpened={state.showShareResult}
					/>
					<Tabs
						config={[
							{
								labelContent: 'Покупки',
								content: <Purchases
									eventId={props.id}
									purchases={purchases}
									eventParticipants={currentEvent.participants}
									currentUser={currentUserName}
								/>,
							},
							{
								labelContent: 'Баланс',
								content: <Balance
									purchases={purchases}
									participants={currentEvent.participants}
									currentUser={currentUserName}
									currentEvent={currentEvent}
									eventId={props.id}
								/>,
							},
							{
								labelContent: 'Действия',
								content: <EventActions
									actions={actions}
								/>,
							},
						]}
					/>
				</Page>
			);
		}

		return null;
	},
});

function mapStateToProps({events}) {
	return {
		currentEvent: events.currentEvent,
		currentUserName: events.currentUserName,
		isFetchingEvent: events.isFetchingEvent,
	};
}

export default connect(mapStateToProps)(withRouter(EventPage));
