import React, {PropTypes} from 'react';
import Checkbox from '../Checkbox';

export default function UniversalListItem(props) {
	const rootClasses = ['list-item'];

	if (props.isBordered) {
		rootClasses.push('list-item_bordered');
	}

	return (
		<div className={rootClasses.join(' ')}>
			<div className="list-item__text">{props.text}</div>
			{props.price && <div className="list-item__price">{props.price} Р</div>}
			{props.isCheckbox && <Checkbox />}
		</div>
	);
}

UniversalListItem.propTypes = {
	text: PropTypes.string.isRequired,
	price: PropTypes.number,
	isCheckbox: PropTypes.bool,
	isBordered: PropTypes.bool,
	iconId: PropTypes.number,
};
