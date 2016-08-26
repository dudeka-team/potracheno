import React, {PropTypes} from 'react';
import CheckBox from '../CheckBox';

const ListItem = React.createClass({
	render() {
		return (
			<li className={(this.props.isBordered ? "list-item_bordered " : "") + "list-item"}>
				{this.props.text && <div className="list-item__text">{this.props.text}</div>}
				{this.props.price && <div className="list-item__price">{this.props.price}</div>}
				{this.props.isCheckBox && <CheckBox id={this.props.id} />}
			</li>
		);
	},
});

ListItem.propTypes = {
	text: PropTypes.string.isRequired,
	price: PropTypes.string,
	isCheckBox: PropTypes.bool,
};

export default ListItem;