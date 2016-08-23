import React from 'react';
import EventsList from '../components/EventsList';
import Popup from '../components/Popup';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';

const EventsPage = React.createClass({
	render() {
		return  (
			<div>
				<EventsList />
				<Popup>
					<TopBar>
						<TopBarIcon icon="burger"/>
						<TopBarHeading title="Шашлые"/>
					</TopBar>
				</Popup>
			</div>
		);
	}
})


export default EventsPage;
