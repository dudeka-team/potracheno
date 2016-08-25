import React from 'react';

const Header = React.createClass({
	render() {
		return <div className="header">{this.props.text}</div>;
	},
});

export default Header;
