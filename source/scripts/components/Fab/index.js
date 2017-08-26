import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const style = {
	position: 'fixed',
	bottom: '16px',
	right: '18px',
};

export default function Fab(props) {
	return (
		<div>
			<FloatingActionButton
				style={style}
				{...props}
				onTouchTap={props.onClick}
			>
				{props.children}
			</FloatingActionButton>
		</div>
	);
}

Fab.propTypes = {
	onClick: PropTypes.func,
};
