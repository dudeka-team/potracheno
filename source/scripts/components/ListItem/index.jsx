import React, {PropTypes} from 'react';
import Checkbox from '../Checkbox';

export default function ListItem(props) {
	const rootClasses = ['list-item'];

	if (props.isBordered) {
		rootClasses.push('list-item_bordered');
	}

	return (
		<li className={rootClasses.join(' ')}>
			{props.text && <div className="list-item__text">{props.text}</div>}
			{props.price && <div className="list-item__price">{props.price}</div>}
			{props.isCheckBox && <Checkbox />}
		</li>
	);
}

ListItem.propTypes = {
	text: PropTypes.string.isRequired,
	price: PropTypes.string,
	isCheckBox: PropTypes.bool,
};
