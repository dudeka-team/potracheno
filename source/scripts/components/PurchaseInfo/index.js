import React from 'react';
import UniversalListItem from '../UniversalListItem';
import BlueSubtitle from '../BlueSubtitle';

const PurchaseInfo = React.createClass({
	getInitialState() {
		const {props} = this;
		const participants = props.purchase.participants;
		const nonParticipants = props.eventParticipants
			.filter(user => participants.indexOf(user) === -1);
		return {
			participants,
			nonParticipants,
		};
	},
	render() {
		const {purchase} = this.props;
		return (
			<div>
				<div className="purchase-info">
					<div className="purchase-info__author">{purchase.payer} заплатил</div>
					<div className="purchase-info__price">{purchase.amount}</div>
				</div>
				<BlueSubtitle text="Участвуют в покупке" />
				{this.state.participants.map((user, index) => {
					return (
						<UniversalListItem id={index} text={user} key={index} />
					);
				})}
				<BlueSubtitle text="Не участвуют в покупке" />
				{this.state.nonParticipants.map((user, index) => {
					return (
						<UniversalListItem id={index} text={user} key={index} />
					);
				})}
			</div>
		);
	},
});

export default PurchaseInfo;
