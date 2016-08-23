import React from 'react';
import EventsList from '../components/EventsList';
import {Popup, PopupFooter} from '../components/Popup';
import {SquareButton} from '../components/SquareButton';

const EventsPage = React.createClass({
	render() {
		return  (
			<div>
				<EventsList />
				<Popup title="Шашлык" closeIcon={true}>
					<EventsList />
					<EventsList />
					<EventsList />
					<EventsList />
					<PopupFooter>
						<SquareButton title="ОТМЕНИТЬ"/>
						<SquareButton title="ДОБАВИТЬ"/>
					</PopupFooter>
				</Popup>
			</div>
		);
	}
})


export default EventsPage;
