import React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import fetchEventData from '../../actions/fetchEventData';

import Wrapper from '../../components/Wrapper';
import FlexContainer from '../../components/FlexContainer';
import Tabs from '../../components/Tabs';
import {TopBar, TopBarHeading, TopBarIcon} from '../../components/TopBar';

import Balance from './Balance';
import Purchases from './Purchases';
import EventActions from './EventActions';


const EventPage = React.createClass({
	componentDidMount() {
		const {params, dispatch} = this.props;
		dispatch(fetchEventData(params.id));
	},

	goToEvents() {
		this.props.router.push('/events');
	},

	render() {
		const {props} = this;
		const {currentEvent, isFetchingEvent} = props;
		const purchases = Object
			.keys((currentEvent && currentEvent.purchases) || [])
			.map((purchaseId) => Object.assign({id: purchaseId}, currentEvent.purchases[purchaseId]));
		const actions = Object
			.keys((currentEvent && currentEvent.actions) || [])
			.map((text) => Object.assign({text}, currentEvent.actions[text]));
		let subtitle = '';
		if (currentEvent) {
			const participantsStatus = `${currentEvent.participants.length} участников`;
			const formattedStart = moment(currentEvent.start).format('DD MMMM');
			const formattedEnd = moment(currentEvent.end).format('DD MMMM');
			let formattedDate;

			if (formattedStart === formattedEnd) {
				formattedDate = formattedStart;
			} else {
				formattedDate = `${formattedStart}–${formattedEnd}`;
			}

			subtitle = `${participantsStatus} • ${formattedDate}`;
		}

		return (
			<Wrapper>
				{isFetchingEvent &&
					<FlexContainer alignItems="center" justifyContent="center">
						<CircularProgress />
					</FlexContainer>
				}
				{!isFetchingEvent && currentEvent &&
					<Wrapper>
						<TopBar>
							<TopBarIcon icon="arrow-back" onClick={this.goToEvents} />

							<TopBarHeading
								title={currentEvent.name}
								subtitle={subtitle}
							/>
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
									name: 'actions',
									labelContent: 'Действия',
									content: <EventActions actions={actions} eventStart={moment(currentEvent.start).format('DD MMMM')}/>,
								},
							]}
						/>
					</Wrapper>
				}
			</Wrapper>
		);
	},
});

function mapStateToProps({events}) {
	return {
		currentEvent: events.currentEvent,
		isFetchingEvent: events.isFetchingEvent,
	};
}

export default connect(mapStateToProps)(withRouter(EventPage));
