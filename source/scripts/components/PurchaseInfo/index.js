import React from 'react';
import UniversalListItem from '../UniversalListItem';
import BlueSubtitle from '../BlueSubtitle';

const PurchaseInfo = React.createClass({
	getInitialState() {
		const {props} = this;
		const {participants} = props.purchase;
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
				<UniversalListItem text={purchase.payer} price={purchase.amount} isBordered={true}/>
				<BlueSubtitle text="Участвуют в покупке" />
				{this.state.participants.map(user => {
					return (
						<UniversalListItem id={user} text={user} key={user} />
					);
				})}
				<BlueSubtitle text="Не участвуют в покупке" />
				{this.state.nonParticipants.map(user => {
					return (
						<UniversalListItem id={user} text={user} key={user} />
					);
				})}
			</div>
		);
	},
});

export default PurchaseInfo;
