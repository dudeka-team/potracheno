import React from 'react';
import BlueSubtitle from '../components/BlueSubtitle';
import BalanceListItem from '../components/BalanceListItem';

export default function BalancePage() {
	return (
		<div className="balance-page">
			<BlueSubtitle text="Ваш баланс" />
			<BalanceListItem sum={2000} from="Вам" to="Дамир" debtType="positive" />
			<BalanceListItem sum={400} from="Вы" to="Костся" debtType="negative" />
			<BalanceListItem sum={1000} from="Женя" to="Юра" debtType="neutral" />
			<BlueSubtitle text="Баланс участников" />
		</div>
	);
}
