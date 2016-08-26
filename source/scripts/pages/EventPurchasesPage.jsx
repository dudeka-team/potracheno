import React from 'react';
import List from '../components/List';
import ListItem from '../components/ListItem';

const EventPurchasesPage = React.createClass({
	render() {
		return (
			<div>
				<List>
					<ListItem text="покупка" />
				</List>
			</div>
			);
	},
});

export default EventPurchasesPage;
