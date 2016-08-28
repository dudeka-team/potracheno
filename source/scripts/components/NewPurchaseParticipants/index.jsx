import React from 'react';
import BlueSubtitle from '../BlueSubtitle';
import UniversalListItem from '../UniversalListItem';

export default function (props) {
	return (
		<div>
			<BlueSubtitle text="Участники покупки" />
			{
				props.users
					.map((user, index) => {
						return (<UniversalListItem
							id={index}
							key={index}
							text={user.name}
							price={user.loan}
							isCheckbox
							isBordered
							style={{
								padding: '18px 19px 18px 16px',
							}}
						/>);
					})
			}
		</div>
	);
}
