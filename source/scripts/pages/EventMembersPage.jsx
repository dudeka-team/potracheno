import React from 'react';
import UniversalListItem from '../components/UniversalListItem';

const members = ['Дамир (Вы)', 'Женя', 'Дан', 'Андрей', 'Юра', 'Костя'];

const EventMembersPage = React.createClass({
	render() {
		return (
			<div>
				{members.map(member => {
					return (<UniversalListItem text={member} />);
				})}
			</div>
			);
	},
});

export default EventMembersPage;
