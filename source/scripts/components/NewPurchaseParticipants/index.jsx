import React from 'react';
import BlueSubtitle from '../BlueSubtitle';
import ListItem from '../ListItem';

export default function (props) {
	return (
		<div>
			<BlueSubtitle text="Участники покупки" />
			{
				props.users
					.map((user, index) => {
						return (<ListItem
							id={index}
							key={index}
							text={user.name}
							price={`${user.loan} Р`}
							isCheckBox
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
