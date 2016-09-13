import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import ReactSwipe from 'react-swipe';
import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';

import {Page} from '../../components/Page';
import FlexContainer from '../../components/FlexContainer';
import {Tabs, TabsContent} from '../../components/Tabs';
import {TopBar, TopBarHeading, TopBarIcon} from '../../components/TopBar';

import Balance from './Balance';
import Purchases from './Purchases';

import EventActions from './EventActions';

import fetchEventData from '../../actions/fetchEventData';
import relogin from '../../actions/relogin';

import Menu from '../../components/Menu';

const EventPage = React.createClass({
	getInitialState() {
		return {
			menuOpen: false,
			index: 0,
		};
	},

	componentDidMount() {
		const {id, dispatch} = this.props;
		dispatch(fetchEventData(id));
	},

	openMenu() {
		this.setState({
			menuOpen: true,
		});
	},

	closeMenu(e) {
		const width = window.innerWidth;
		if (e.pageX < width / 6) {
			this.setState({
				menuOpen: false,
			});
		}
	},

	handleToggle() {
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

	goToEvents() {
		this.props.router.push('/events');
	},

	renderPreloader() {
		return (
			<FlexContainer alignItems="center" justifyContent="center">
				<CircularProgress />
			</FlexContainer>
		);
	},

	changedTab(index) {
		this.setState({index});
	},

	onTabClick(index) {
		this.setState({index});
		this.refs.reactSwipe.swipe.slide(index, 200);
	},

	render() {
		const {props, state} = this;
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
					<Drawer
						onRequestChange={(menuOpen) => this.setState({menuOpen})}
						docked={false}
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
					<TopBar>
						<TopBarIcon icon="arrow-back" onClick={this.goToEvents} />
						<TopBarHeading
							title={currentEvent.name}
							subtitle={subtitle}
						/>
						<TopBarIcon icon="more-actions" onClick={this.handleToggle} />
					</TopBar>
					<Tabs
						titles={['покупки', 'баланс', 'действия']}
						activeTab={state.index}
						onTabClick={this.onTabClick}
					/>
					<ReactSwipe
						swipeOptions={{
							callback: this.changedTab,
							continuous: false,
						}}
						ref="reactSwipe"
					>
						<div>
							<Purchases
								eventId={props.id}
								purchases={purchases}
								eventParticipants={currentEvent.participants}
								currentUser={currentUser}
							/>
						</div>
						<TabsContent title="2">
							<Balance
								purchases={purchases}
								participants={currentEvent.participants}
								currentUser={currentUser}
								currentEvent={currentEvent}
								eventId={props.id}
							/>
						</TabsContent>
						<TabsContent title="3">
							<EventActions
								actions={actions}
							/>
						</TabsContent>
					</ReactSwipe>

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
