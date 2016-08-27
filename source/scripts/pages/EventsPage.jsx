import React from 'react';
import {hashHistory} from 'react-router';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import EventsListItem from '../components/EventsListItem';
import List from '../components/List';

export default function EventsPage() {
	return (
		<div>
			<TopBar>
				<TopBarIcon icon="burger" />
				<TopBarHeading title="Мероприятия" />
				<TopBarIcon icon="plus" />
			</TopBar>
			<List>
				<EventsListItem title="Дача у Дамира" membersNumber={5} date="12 апреля" sum={5490} debtType="positive" />
				<EventsListItem title="Шашлык" membersNumber={3} date="21 августа" sum={2200} debtType="negative" />
			</List>
		</div>
	);
}
