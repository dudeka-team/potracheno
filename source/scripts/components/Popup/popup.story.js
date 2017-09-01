import React from 'react';
import { storiesOf } from '@storybook/react';
import Popup from './index';

storiesOf('Popup', module)
	.add('default', () => (
		<Popup
			title="Шашлык"
			closeIcon
			onClose={() => {}}
			okButton={{
				text: 'Добавить',
				onClick: () => {},
			}}
			cancelButton={{
				text: 'Отменить',
				onClick: () => {},
			}}
		>
			Popup content
		</Popup>
	))
	.add('no close icon', () => (
		<Popup
			title="Шашлык"
			okButton={{
				text: 'Добавить',
				onClick: () => {},
			}}
			cancelButton={{
				text: 'Отменить',
				onClick: () => {},
			}}
		>
			Content
		</Popup>
	))
	.add('no footer', () => (
		<Popup
			title="Шашлык"
			closeIcon
			onClose={() => {}}
		>
			Content
		</Popup>
	))
	.add('one button', () => (
		<Popup
			title="Шашлык"
			closeIcon
			onClose={() => {}}
			okButton={{
				text: 'Добавить',
				onClick: () => {},
			}}
		>
			Content
		</Popup>
	))
