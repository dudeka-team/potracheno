import React from 'react';
import EventStatus from '../EventStatus';
import GreySubtitle from '../GreySubtitle';

export default function UserSelection() {
	return (
		<div className="user-selection">
			<div className="user-selection__top-bar">
				<div className="user-selection__invite-text">
					Лина прислала вам приглашение на мероприятие
				</div>
				<div className="user-selection__icon" />
			</div>
			<EventStatus name="Выходные на даче" subtitle="6 участников ● 2 сентября" userSelection />
			<GreySubtitle text="Выберите себя среди участников" userSelection />
		</div>
	);
}
