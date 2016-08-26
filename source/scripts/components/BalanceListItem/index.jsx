import React from 'react';
import List from '../List';

const BalanceListItem = React.createClass({
	render() {
		const curUser = this.props.curUser.name;

		const listItems = this.props.data.map(item => {
			return (
				((curUser.indexOf(item.owner) !== -1) &&
				item.members.map(member => {
					if (member !== curUser) {
						return (
							<li className="balance-list-item" key={item.member}>
								<div className="balance-list-item__direction">
									Вам
									<span className="balance-list-item__icon balance-list-item__icon_to-you" />
									{`${member}`}
								</div>
								<div className="balance-list-item__sum">
									{Math.round(item.sum / item.members.length)} Р
								</div>
							</li>
						);
					}
				}))
			);
		});

		return (
			<List>
				{listItems}
			</List>
		);
	},
});

export default BalanceListItem;
