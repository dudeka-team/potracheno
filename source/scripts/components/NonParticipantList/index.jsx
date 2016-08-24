import React from 'react';

class NonParticipantList extends React.Component {
	render() {
		let nonParticipantListItems = this.props.data.nonParticipantList.map((item) => {
			return (
				<li className='modal-purchase-list__item modal-purchase-list__item--participation' key={item.id} >{item.name}</li>
			);
		});
		return (
				<ul className="modal-purchase-list modal-purchase-list--participation">
					{nonParticipantListItems}
				</ul>
		);
	}
};

export default NonParticipantList;
