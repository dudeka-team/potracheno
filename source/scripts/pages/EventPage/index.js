import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';

import {Page} from '../../components/Page';
import FlexContainer from '../../components/FlexContainer';
import Tabs from '../../components/Tabs';
import {TopBar, TopBarHeading, TopBarIcon} from '../../components/TopBar';
import Menu from '../../components/Menu';

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

	renderPreloader() {
		return (
			<FlexContainer alignItems="center" justifyContent="center" fullHeight>
				<CircularProgress />
			</FlexContainer>
		);
	},

	renderDrawer(currentEvent, subtitle) {
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
					subtitle={subtitle}
					handleEdit={this.goToEdit}
					handleRelogin={this.handleRelogin}
				/>
			</Drawer>
		);
	},

	render() {
		const {props} = this;
		const {currentEvent, isFetchingEvent} = props;
		const purchases = Object
			.keys((currentEvent && currentEvent.purchases) || [])
			.map((purchaseId) => Object.assign({id: purchaseId}, currentEvent.purchases[purchaseId]));
		const actions = Object
			.keys((currentEvent && currentEvent.actions) || [])
			.map((config) => Object.assign({config}, currentEvent.actions[config]));

		if (isFetchingEvent) {
			return this.renderPreloader();
		}

		const currentUser = props.localEvents[props.id];

		if (currentEvent) {
			const subtitle = this.formatSubtitle(currentEvent);

			return (
				<Page>
					{this.renderDrawer(currentEvent, subtitle)}
					<TopBar>
						<TopBarIcon icon="arrow-back" onClick={this.goToEvents} />
						<TopBarHeading
							title={currentEvent.name}
						/>
						<TopBarIcon icon="share" />
						<TopBarIcon icon="burger" onClick={this.toggleMenu} />
					</TopBar>
					<Tabs
						config={[
							{
								labelContent: 'Покупки',
								content: <Purchases
									eventId={props.id}
									purchases={purchases}
									eventParticipants={currentEvent.participants}
									currentUser={currentUser}
								/>,
							},
							{
								labelContent: 'Баланс',
								content: <Balance
									purchases={purchases}
									participants={currentEvent.participants}
									currentUser={currentUser}
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
		isFetchingEvent: events.isFetchingEvent,
		localEvents: events.localEvents,
	};
}

export default connect(mapStateToProps)(withRouter(EventPage));
