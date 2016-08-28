import React from 'react';
import {hashHistory} from 'react-router';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import EventsListItem from '../components/EventsListItem';

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
			<EventsListItem
				title="Дача у Дамира"
				membersCount={5}
				date={new Date()}
				sum={5490}
				debtType="positive"
			/>
			<EventsListItem
				title="Шашлык"
				membersCount={3}
				date={new Date()}
				sum={2200}
				debtType="negative"
			/>
		</div>
	);
}
