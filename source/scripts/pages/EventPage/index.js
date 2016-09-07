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


const EventPage = React.createClass({
	goToEvents() {
		this.props.router.push('/events');
	},

	goToEdit() {
		const {router, params} = this.props;
		router.push(`/events/${params.id}/edit`);
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
		const {props} = this;
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
					<TopBar>
						<TopBarIcon icon="arrow-back" onClick={this.goToEvents} />
						<TopBarHeading
							title={currentEvent.name}
							subtitle={this.formatSubtitle(currentEvent)}
						/>
						<TopBarIcon icon="pen" onClick={this.goToEdit} />
						<TopBarIcon icon="arrow-share" />
						<TopBarIcon icon="more-actions" />
					</TopBar>
					<Tabs
						config={[
							{
								name: 'purchases',
								labelContent: 'Покупки',
								content: <Purchases
									eventId={this.props.params.id}
									purchases={purchases}
									eventParticipants={currentEvent.participants}
								/>,
							},
							{
								name: 'balance',
								labelContent: 'Баланс',
								content:
									<Balance
										purchases={purchases}
										participants={currentEvent.participants}
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
