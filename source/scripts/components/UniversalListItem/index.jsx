import React, {PropTypes} from 'react';
import Checkbox from '../Checkbox';

const UniversalListItem = React.createClass({
	propTypes: {
		text: PropTypes.string.isRequired,
		price: PropTypes.number,
		isCheckable: PropTypes.bool,
		isBordered: PropTypes.bool,
		isChecked: PropTypes.bool,
	},

	render() {
		const baseClass = 'universal-list-item';
		const rootClasses = [baseClass];
		const {props} = this;

		if (props.isBordered) {
			rootClasses.push(`${baseClass}_bordered`);
		}

		return (
			<div className={rootClasses.join(' ')}>
				<div className={`${baseClass}__text`}>{props.text}</div>
				{props.price && <div className={`${baseClass}__price`}>{props.price} Р</div>}
				{props.isCheckbox && <Checkbox checked />}
			</div>
		);
	},
});

export default UniversalListItem;
