import React from 'react';
import Tabs from '../components/Tabs';

const tabsConfig = [
	{
		name: 'purchases',
		labelContent: 'Покупки',
		content: 'Контент покупок',
	},
	{
		name: 'balance',
		labelContent: 'Баланс',
		content: 'Контент баланса',
	},
];

const EventPage = React.createClass({
	render() {
		return (
			<div className="event-page">
				<Tabs config={tabsConfig} />
			</div>
		);
	},
});

export default EventPage;
