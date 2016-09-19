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
import HintPopup from '../../components/HintPopup';

import Balance from './Balance';
import Purchases from './Purchases';

import EventActions from './EventActions';

import fetchEventData from '../../actions/fetchEventData';
import relogin from '../../actions/relogin';
import closeShareLinkPopup from '../../actions/closeShareLinkPopup';
import openShareLinkPopup from '../../actions/openShareLinkPopup';

import {DRAWER_SWIPE_AREA_WIDTH} from '../../constants';

const EventPage = React.createClass({
	getInitialState() {
		return {
			menuOpen: false,
			showShareResult: false,
			shareResultMessage: '',
			hintPopupOpen: false,
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
		this.props.dispatch(openShareLinkPopup());
	},

	closeSharePopup() {
		this.props.dispatch(closeShareLinkPopup());
	},

	openHintPopup() {
		this.setState({
			hintPopupOpen: true,
		});
	},

	closeHintPopup() {
		this.setState({
			hintPopupOpen: false,
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

	handleCopy() {
		const {props} = this;
		const range = document.createRange();
		const selection = window.getSelection();
		selection.removeAllRanges();

		range.selectNode(this.linkNode);
		selection.addRange(range);

		let message;

		if (document.execCommand('copy')) {
			selection.removeAllRanges();
			message = 'Ссылка&nbsp;скопирована в&nbsp;буфер обмена';
			props.dispatch(closeShareLinkPopup());
		} else {
			// eslint-disable-next-line max-len
			message = 'Устройство не&nbsp;поддерживает автоматическое копирование. Пожалуйста, скопируйте выделенный текст сами';
		}

		this.setState({
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
					icon="bordered-plus"
					currentEvent={currentEvent}
					currentUserName={currentUserName}
					subtitle={subtitle}
					handleEdit={this.goToEdit}
					handleHint={this.openHintPopup}
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
		const {props} = this;
		// eslint-disable-next-line max-len
		const annotation = 'Поделитесь ссылкой на мероприятие с друзьями, чтобы они могли вести учёт покупок вместе с вами:';

		return (
			<Portal isOpened={props.shareLinkPopupOpened}>
				<Popup
					title="Пригласить друзей"
					onClose={this.closeSharePopup}
					okButton={{
						text: 'Скопировать',
						onClick: this.handleCopy,
					}}
					cancelButton={{
						text: 'Позднее',
						onClick: this.closeSharePopup,
					}}
				>
					<div className="share-link">
						<p className="share-link__annotation">{annotation}</p>
						<div className="share-link__link-wrapper">
							<div
								className="share-link__link"
								ref={(linkNode) => (this.linkNode = linkNode)}
							>{window.location.href}</div>
						</div>
					</div>
				</Popup>
			</Portal>
		);
	},

	renderHintPopup() {
		const {state} = this;
		// eslint-disable-next-line max-len
		const annotation = 'Для установки приложения нажмите «Добавить на&nbsp;главный экран» или «На&nbsp;экран домой» в&nbsp;меню браузера';
		return (
			<Portal isOpened={state.hintPopupOpen}>
				<HintPopup
					text={annotation}
					bottomText="Не сейчас"
					closeHintPopup={this.closeHintPopup}
				/>
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
					{this.renderHintPopup()}
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
		shareLinkPopupOpened: events.shareLinkPopupOpened,
	};
}

export default connect(mapStateToProps)(withRouter(EventPage));
