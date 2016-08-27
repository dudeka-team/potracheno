import React, {PropTypes} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const style = {
	position: 'fixed',
	bottom: '16px',
	right: '18px',
};

export default function Fab(props) {
	return (
		<FloatingActionButton
			backgroundColor={props.bgcolor}
			style={style}
			onClick={props.onClick}
		>
			{props.icon}
		</FloatingActionButton>
	);
}

Fab.propTypes = {
	bgcolor: PropTypes.string,
	icon: PropTypes.object,
	onClick: PropTypes.func,
};

// Example usage
// import PersonAdd from 'material-ui/svg-icons/social/person-add';
// <Fab icon={<PersonAdd />} />
