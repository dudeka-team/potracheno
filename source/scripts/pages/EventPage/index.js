import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import fetchEventData from '../../actions/fetchEventData';

import {Page} from '../../components/Page';
import FlexContainer from '../../components/FlexContainer';
import Tabs from '../../components/Tabs';
import {TopBar, TopBarHeading, TopBarIcon} from '../../components/TopBar';

import Balance from './Balance';
import Purchases from './Purchases';

import Participants from './Participants';


import Menu from '../../components/Menu';

const EventPage = React.createClass({
	getInitialState() {
		return {
			menuOpen: false,
		};
	},

	componentDidMount() {
		const {params, dispatch} = this.props;
		dispatch(fetchEventData(params.id));
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
		const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		if (e.pageX < width / 6.0) {
			this.setState({
				menuOpen: false,
			});
		}
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
			return (
				<Page>
					<Menu
						closeMenu={this.closeMenu}
						participants={currentEvent.participants}
						name={currentEvent.name}
						subtitle={this.formatSubtitle(currentEvent)}
						menuOpen={state.menuOpen}
					/>
					<TopBar>
						<TopBarIcon icon="arrow-back" onClick={this.goToEvents} />
						<TopBarHeading
							title={currentEvent.name}
							subtitle={this.formatSubtitle(currentEvent)}
						/>
						<TopBarIcon icon="arrow-share" />
						<TopBarIcon icon="more-actions" onClick={this.openMenu} />
					</TopBar>
					<Tabs
						config={[
							{
								name: 'purchases',
								labelContent: 'Покупки',
								content: <Purchases
									eventId={this.props.params.id}
									purchases={purchases}
									currentEvent={currentEvent}
								/>,
							},
							{
								name: 'balance',
								labelContent: 'Баланс',
								content:
									<Balance
										purchases={purchases}
										participants={currentEvent.participants}
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
