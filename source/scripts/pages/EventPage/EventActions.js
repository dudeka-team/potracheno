import React, {PropTypes} from 'react';
import {withRouter} from 'react-router';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Fab from '../../components/Fab';
import UniversalListItem from '../../components/UniversalListItem';

export default function EventActions(props) {
	return (
		<div>
			<UniversalListItem text={`Мероприятие было создано ${props.eventStart}`} isBordered/>
			{ props.actions.map((item, i) => {
				return (
					<UniversalListItem text={`${item.text}`} isBordered/>		
				)
			}) }
		</div>
	);
}

export default EventActions;
