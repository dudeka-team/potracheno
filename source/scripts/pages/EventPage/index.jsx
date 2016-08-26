import React from 'react';
import {hashHistory} from 'react-router';
import Tabs from '../../components/Tabs';
import BalancePage from '../BalancePage';
import EventPurchasesPage from '../EventPurchasesPage';
import EventMembersPage from '../EventMembersPage';
import {TopBar, TopBarHeading, TopBarIcon} from '../../components/TopBar';

const tabsConfig = [
	{
		name: 'purchases',
		labelContent: 'Покупки',
		content: <EventPurchasesPage />,
	},
	{
		name: 'balance',
		labelContent: 'Баланс',
		content: <BalancePage />
	},
	{
		name: 'members',
		labelContent: 'Учасники',
		content: <EventMembersPage />
	},
];

function goToEvents() {
	hashHistory.push('/events');
}

const EventPage = React.createClass({
	render() {
		return (
			<div className="event-page">
				<TopBar>
					<TopBarIcon icon="arrow-back" onClick={goToEvents}/>
					<TopBarHeading title="Дача у Дамира" subtitle="5 участников - 12 апреля"/>
					<TopBarIcon icon="arrow-share" />
					<TopBarIcon icon="more-actions" />
				</TopBar>
				<Tabs config={tabsConfig} />
			</div>
		);
	},
});

export default EventPage;
