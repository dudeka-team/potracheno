import React from 'react';

class BlueSubtitle extends React.Component {
	render() {
		return (
			<div className="blue-subtitle">
				{this.props.text}
			</div>
		);
	}
}

export default BlueSubtitle;
