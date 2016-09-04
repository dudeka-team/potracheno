import React from 'react';
import UniversalListItem from '../../components/UniversalListItem';

export default function EventActions(props) {
	return (
		<div>
			<UniversalListItem text={`Мероприятие было создано ${props.eventStart}`} isBordered />
			{props.actions.map((item) => {
				return (
					<UniversalListItem text={`${item.text}`} isBordered />
				);
			})}
		</div>
	);
}

