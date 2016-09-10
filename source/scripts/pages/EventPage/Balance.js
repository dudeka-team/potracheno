import React from 'react';
import BlueSubtitle from '../../components/BlueSubtitle';
import BalanceListItem from '../../components/BalanceListItem';
import BalanceItemPopup from '../../components/BalanceItemPopup';
import {getEventBalance, getEventsParticipantsDebts} from '../../modules/balance';

export default function BalancePage(props) {
	const eventsParticipantsDebts =
		getEventsParticipantsDebts(
			getEventBalance(props.currentEvent),
			props.currentEvent
		);

	const {currentUser} = props;

	return (
		<div className="balance-page">
			<BlueSubtitle text="Баланс участников" />
			<BalanceItemPopup debt={eventsParticipantsDebts[0]} />
			<div>{
				eventsParticipantsDebts.map((debt, i) => {
					return (
						<BalanceListItem
							key={i}
							sum={-Math.round(debt.sum)}
							from={debt.from + ((currentUser === debt.from && ' (Вы)') || '')}
							to={debt.to + ((currentUser === debt.to && ' (Вы)') || '')}
							debtType="neutral"
						/>
					);
				})
			}</div>
		</div>
	);
}
