import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export function TopBar(props) {
	const classes = ['top-bar'];
	if (props.bordered) {
		classes.push('top-bar_bordered');
	}
	return <div className={classes.join(' ')}>{props.children}</div>;
}

export function TopBarHeading({ subtitle, title, className, ...restProps }) {
	return (
		<div
			{...restProps}
			className={cn(className, 'top-bar__heading', {
				'top-bar__heading--with-subtitle': subtitle,
			})}
		>
			<div className="top-bar__title">{title}</div>
			{subtitle && <div className="top-bar__subtitle">{subtitle}</div>}
		</div>
	);
}

TopBarHeading.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
};

export function TopBarIcon({
	className,
	icon,
	disabled,
	onClick,
	...restProps
}) {
	return (
		<div
			{...restProps}
			className={cn(className, 'top-bar__icon', `top-bar__icon--${icon}`, {
				'top-bar__icon--disabled': disabled,
			})}
			onClick={!disabled && onClick}
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
	className: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
};
