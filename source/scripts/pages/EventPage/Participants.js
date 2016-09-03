import React, {PropTypes} from 'react';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Fab from '../../components/Fab';
import UniversalListItem from '../../components/UniversalListItem';

export default function EventParticipants(props) {
	return (
		<div>
			{props.participants.map((participant, i) => (
				<UniversalListItem key={i} text={participant} isBordered={true}/>
			))}

			<Fab backgroundColor="#3f95ff">
				<PersonAdd />
			</Fab>
		</div>
	);
}

EventParticipants.propTypes = {
	participants: PropTypes.array.isRequired,
};
