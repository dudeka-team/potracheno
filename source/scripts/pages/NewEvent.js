import React from 'react';
import {connect} from 'react-redux';

import createEvent from '../actions/createEvent';

import EditEvent from '../components/EditEvent';


const NewEventPage = React.createClass({
	save(eventData) {
		const {dispatch} = this.props;
		dispatch(createEvent(eventData));
	},

	render() {
		return (
			<EditEvent
				pageTitle="Новое мероприятие"
				prevUrl="/events"
				handleSave={this.save}
			/>
		);
	},
});

export default connect()(NewEventPage);
