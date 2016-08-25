import React, {PropTypes} from 'react';

const Header = React.createClass({
	render() {
		return <div className="header">{this.props.text}</div>;
	},
});

Header.propTypes = {
	text: PropTypes.string.isRequired,
};

export default Header;

