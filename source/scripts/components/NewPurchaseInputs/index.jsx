import React from 'react';
import Input from '../Input';

export default function PurchaseMainInputBlock(props) {
	return (
		<div className='new-purchase-inputs'>
			<Input
				hint='0 руб.'
				style={{
					fontSize: '30px',
					marginTop: '20px'
				}}
				label='Сумма'
				labelStyle={{
					top: '-21px',
					fontSize: '12px',
					color: '#818f99',
					opacity: '0',
					transition: 'opacity 0.15s'
				}}
				labelTransform={{
					opacity: '1'
				}}
			/>
			<Input
				style={{
					marginTop: '42px',
					fontSize: '16px'
				}}
				label='Название покупки'
				labelTransform={{
					transform: 'scale(0.75) translateY(-24px)',
					color: '#818f99'
				}}
			/>
		</div>
	);
}
