import React from 'react';

class List extends React.Component {
	render() {
		return (
			<ul className="list">
				{this.props.children}
			</ul>
		);
	}
}

export default List;
