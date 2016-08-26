import React from 'react';
import EventListItems from '../EventsListItems';
import {hashHistory} from 'react-router';

const data = [{
	title: 'Трип по Европе',
	date: '5 марта',
	sum: '5 490',
	direction: 'вам должны',
	id: '1',
	members: [{name: 'Вася'}, {name: 'Петя'}, {name: 'Миша'}],
},
	{
		title: 'Поездка на дачу',
		date: '16 апреля',
		sum: '2 200',
		direction: 'вам должны',
		id: '2',
		members: [{name: 'Вася'}, {name: 'Петя'}, {name: 'Миша'}, {name: 'Витя'}],
	}];

function goToEvent() {
	hashHistory.push('/event');
}

const EventsList = React.createClass({
	getInitialState() {
		return {data};
	},
	render() {
		return (
			<div className="events-box">
				<EventListItems data={this.state.data} goToEvent={goToEvent}/>
			</div>
		);
	},
});


export default EventsList;
