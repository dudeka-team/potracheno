import React, {PropTypes} from 'react';

export function TopBar(props) {
	return (
		<div className="top-bar">
			{props.children}
		</div>
	);
}

export function TopBarHeading(props) {
	return (
		<div className="top-bar__heading">
			<div className="top-bar__title">{props.title}</div>
			{props.subtitle && <div className="top-bar__subtitle">{props.subtitle}</div>}
		</div>
	);
}

TopBarHeading.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
};

export function TopBarIcon(props) {
	return (
		<div className={`top-bar__icon top-bar__icon--${props.icon}`} />
	);
}

TopBarIcon.propTypes = {
	icon: PropTypes.oneOf(['burger', 'add']).isRequired,
};
