import React from 'react';
import {hashHistory} from 'react-router';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import EventsList from '../components/EventsList';
import {Popup, PopupContent, PopupFooter} from '../components/Popup';
import {SquareButton} from '../components/SquareButton';
import PurchaseInfo from '../components/PurchaseInfo';


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

