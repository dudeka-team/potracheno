import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import {Page} from '../../components/Page';
import FlexContainer from '../../components/FlexContainer';
import Tabs from '../../components/Tabs';
import {TopBar, TopBarHeading, TopBarIcon} from '../../components/TopBar';

import Balance from './Balance';
import Purchases from './Purchases';

import Participants from './Participants';
import fetchEventData from '../../actions/fetchEventData';
import relogin from '../../actions/relogin';


import Menu from '../../components/Menu';

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
			<FlexContainer alignItems="center" justifyContent="center">
				<CircularProgress />
			</FlexContainer>
		);
	},

	render() {
		const {props, state} = this;
		const {currentEvent, isFetchingEvent} = props;
		const purchases = Object
			.keys((currentEvent && currentEvent.purchases) || [])
			.map((purchaseId) => Object.assign({id: purchaseId}, currentEvent.purchases[purchaseId]));

		if (isFetchingEvent) {
			return this.renderPreloader();
		}

		if (currentEvent) {
			const subtitle = this.formatSubtitle(currentEvent);

			return (
				<Page>
					<Menu
						currentEvent={currentEvent}
						subtitle={subtitle}
						menuOpen={state.menuOpen}
						handleEdit={this.goToEdit}
						handleRelogin={this.handleRelogin}
						closeMenu={this.closeMenu}
					/>
					<TopBar>
						<TopBarIcon icon="arrow-back" onClick={this.goToEvents} />
						<TopBarHeading
							title={currentEvent.name}
							subtitle={subtitle}
						/>
						<TopBarIcon icon="more-actions" onClick={this.openMenu} />
					</TopBar>
					<Tabs
						config={[
							{
								name: 'purchases',
								labelContent: 'Покупки',
								content:
									<Purchases
										eventId={props.id}
										purchases={purchases}
										eventParticipants={currentEvent.participants}
									/>,
							},
							{
								name: 'balance',
								labelContent: 'Баланс',
								content:
									<Balance
										currentEvent={currentEvent}
									/>,
							},
							{
								name: 'members',
								labelContent: 'Участники',
								content: <Participants participants={currentEvent.participants} />,
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
	};
}

export default connect(mapStateToProps)(withRouter(EventPage));
