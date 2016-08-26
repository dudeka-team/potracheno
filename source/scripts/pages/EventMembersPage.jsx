import React from 'react';
import List from '../components/List';
import ListItem from '../components/ListItem';

let members = ['Дамир (Вы)', 'Женя', 'Дан', 'Андрей', 'Юра', 'Костя'];

class EventMembersPage extends React.Component {
	render() {

		let membersItems = members.map(member => {
			return <ListItem text={member} />
		});

		return (
			<div>
				<List>
					{membersItems}
				</List>
			</div>
			);
	}
}

export default EventMembersPage;
