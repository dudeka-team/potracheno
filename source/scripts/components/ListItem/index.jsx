import React, {PropTypes} from 'react';
import CheckBox from '../CheckBox';

const ListItem = React.createClass({
	render() {
		return (
			<li onClick={this.props.onClick} style={this.props.style} className={(this.props.isBordered ? "list-item_bordered " : "") + "list-item"}>
				{this.props.text && <div style={this.props.iconId === this.props.id ? {fontWeight: '500'} : {}} className="list-item__text">{this.props.text}</div>}
				{this.props.price && <div className="list-item__price">{this.props.price}</div>}
				{this.props.iconId === this.props.id && <div className="list-item__icon">{this.props.isIcon}</div>}
				{this.props.isCheckBox && <CheckBox id={this.props.id} />}
			</li>
		);
	},
});

ListItem.propTypes = {
	text: PropTypes.string.isRequired,
	price: PropTypes.string,
	isCheckBox: PropTypes.bool,
	iconId: PropTypes.number
};

export default ListItem;
