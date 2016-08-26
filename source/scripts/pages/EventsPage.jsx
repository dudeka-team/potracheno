import React from 'react';
import {hashHistory} from 'react-router';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import EventsList from '../components/EventsList';


function goToNewEventPage() {
	hashHistory.push('/events/new');
}

export default function EventsPage() {
	return (
		<div>
			<TopBar>
				<TopBarIcon icon="burger" />
				<TopBarHeading title="Мероприятия" />
				<TopBarIcon icon="plus" onClick={goToNewEventPage} />
			</TopBar>
			<EventsList />
		</div>
	);
}
