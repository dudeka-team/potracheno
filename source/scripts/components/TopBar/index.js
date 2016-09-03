import React, {PropTypes} from 'react';

export function TopBar(props) {
	return (
		<div className="top-bar-wrapper">
			<div className="top-bar">
				{props.children}
			</div>
		</div>
	);
}

export function TopBarHeading(props) {
	const classes = ['top-bar__heading'];

	if (props.subtitle) {
		classes.push('top-bar__heading--with-subtitle');
	}

	return (
		<div className={classes.join(' ')}>
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
	const baseClass = 'top-bar__icon';
	const classes = [baseClass, `${baseClass}--${props.icon}`];

	if (props.disabled) {
		classes.push(`${baseClass}--disabled`);
	}

	return (
		<div
			className={classes.join(' ')}
			onClick={!props.disabled && props.onClick}
		/>
	);
}

TopBarIcon.propTypes = {
	icon: PropTypes.oneOf([
		'burger',
		'plus',
		'info',
		'add-person',
		'arrow-back',
		'check-active',
		'arrow-forward-blue',
		'arrow-forward-gray',
		'arrow-share',
		'more-actions',
		'pen',
	]).isRequired,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
};
