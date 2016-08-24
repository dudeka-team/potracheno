import React from 'react';

class ParticipantList extends React.Component {
	render() {
		let participantListItems = this.props.data.participantList.map((item) => {
			return (
				<li className='modal-purchase-list__item modal-purchase-list__item--participation' key={item.id}>{item.name}</li>
			);
		});
		return (
				<ul className="modal-purchase-list modal-purchase-list--participation">
					{participantListItems}
				</ul>
		);
	}
};

export default ParticipantList;
