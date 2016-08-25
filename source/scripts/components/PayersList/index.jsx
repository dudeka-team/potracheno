import React, {PropTypes} from 'react';
import ListItem from 'components/ListItem';

const PayersList = React.createClass({
	render() {
		let listItems = this.props.data.payers.map(item => {
			return (
				<ListItem id={item.id} text={item.name} key={item.id} isCheckBox />
			);
		});

		return (
			<div>
				<ul className="modal-content-payers__list">
					{listItems}
				</ul>
			</div>
		);
	},
});


export default PayersList;
