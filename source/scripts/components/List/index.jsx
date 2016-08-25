import React from 'react';

class List extends React.Component {
	render() {
		let listItems = this.props.data.map((item) => {
			return (
				<li className="list__item" key={item.id}>{item.name}</li>
			);
		});
		return (
			<ul className="list">
				{listItems}
			</ul>
		);
	}
}

export default List;
