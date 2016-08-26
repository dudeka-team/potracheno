import React from 'react';
import List from '../components/List';
import ListItem from '../components/ListItem';

class EventPurchasesPage extends React.Component {
	render() {
		return (
			<div>
				<List>
					<ListItem text="покупка"/>
				</List>
			</div>
			);
	}
}

export default EventPurchasesPage;
