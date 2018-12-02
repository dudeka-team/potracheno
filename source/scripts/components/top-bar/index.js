import React from 'react';
import PropTypes from 'prop-types';

export function TopBar(props) {
	const classes = ['top-bar'];
	if (props.bordered) {
		classes.push('top-bar_bordered');
	}
	return <div className={classes.join(' ')}>{props.children}</div>;
}

export function TopBarHeading(props) {
	const classes = ['top-bar__heading'];

	if (props.subtitle) {
		classes.push('top-bar__heading--with-subtitle');
	}

	return (
		<div className={classes.join(' ')}>
			<div className="top-bar__title">{props.title}</div>
			{props.subtitle && (
				<div className="top-bar__subtitle">{props.subtitle}</div>
			)}
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
		'share',
		'close',
		'mail',
		'bordered-plus',
	]).isRequired,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
};
