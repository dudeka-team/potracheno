import React from 'react';
import SubHeader from '../SubHeader';

export default function PurchaseMainInputBlock(props) {
	return (
		<div className='purchase-inputs'>
			<SubHeader text='Сумма' />
			<SubHeader text='Название покупки' />
		</div>
	);
}
