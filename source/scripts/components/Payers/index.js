import React, { PureComponent } from 'react';
import UniversalListItem from '../universal-list-item';
import IconCheck from '../icons/check';

export default class Payers extends PureComponent {
	render() {
		const { participants, payer, getFullName, changePayer } = this.props;

		return (
			<div className="payers">
				{participants.map((user) => (
					<UniversalListItem
						key={user}
						onClick={() => changePayer(user)}
						postfix={payer === user ? <IconCheck /> : null}
					>
						{getFullName(user)}
					</UniversalListItem>
				))}
			</div>
		);
	}
}
