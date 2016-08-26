import React from 'react';

class BalanceListItem extends React.Component {
	render() {
		let owner = this.props.curUser.name;
		let listItems = this.props.data.map(item => {
			return (
				((owner.indexOf(item.owner) !== -1) &&
				item.members.map(member => {
					if (member !== owner) {
						return (
							<li className="balance-list-item" key={item.member}>
								<div className="balance-list-item__direction">
									Вам
									<span className="balance-list-item__icon balance-list-item__icon_to-you" />
									{`${member}`}
								</div>
								<div className="balance-list-item__sum">{Math.round(item.sum/item.members.length)} Р</div>
							</li>
						)
					}
				}))
			);
		});
		return (
			<div>
				{listItems}
			</div>
		);
	}
}

export default BalanceListItem;
