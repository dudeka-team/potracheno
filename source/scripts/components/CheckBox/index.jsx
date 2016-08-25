import React, {PropTypes} from 'react';

const CheckBox = React.createClass({
	render() {
		return (
			<div className="checkbox-wrapper">
				<input id={'checkbox-' + this.props.id} onClick={this.updateState} className="checkbox" type="checkbox" />
				<label className="checkbox-label" htmlFor={'checkbox-' + this.props.id}></label>
			</div>
		);
	},
});

CheckBox.propTypes = {
	id: PropTypes.number.isRequired,
};

export default CheckBox;
