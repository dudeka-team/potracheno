import React from 'react';
import {TopBar, TopBarHeading, TopBarIcon} from '../components/TopBar';
import {Link} from 'react-router';

class NewEventStepTwoPage extends React.Component {
	render() {
		return (
			<div>
				<TopBar>
					<Link to="/new-event"><TopBarIcon icon="arrow-back" /></Link>
					<TopBarHeading title="Добавить учасников" />
					<Link to="/event">
						<TopBarIcon icon="check-inactive" />
					</Link>
				</TopBar>
			</div>
		)
	}
}

export default NewEventStepTwoPage;
