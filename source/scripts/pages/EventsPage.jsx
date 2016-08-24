import React from 'react';
import EventsList from '../components/EventsList';
import {Popup, PopupContent, PopupFooter} from '../components/Popup';
import {SquareButton} from '../components/SquareButton';

const EventsPage = React.createClass({
	render() {
		return  (
			<div>
				<EventsList />
				<Popup title="Шашлык" closeIcon={true}>
					<PopupContent>
						<EventsList />
						<EventsList />
						<EventsList />
					</PopupContent>
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
