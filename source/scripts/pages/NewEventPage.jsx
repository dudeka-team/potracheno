import React from 'react';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import {Link} from 'react-router';

class NewEventPage extends React.Component {
	render() {
		return (
			<div>
				<TopBar>
					<Link to="/events"><TopBarIcon icon="arrow-back" /></Link>
					<TopBarHeading title="Новое мероприятие" />
					<Link to="/new-event-step-2"><TopBarIcon icon="arrow-back" /></Link>
				</TopBar>
			</div>
		)
	}
}

export default NewEventPage;
