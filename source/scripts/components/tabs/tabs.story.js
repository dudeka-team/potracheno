import React from 'react';
import { storiesOf } from '@storybook/react';
import Tabs from './';

storiesOf('Tabs', module).add('default', () => (
	<Tabs
		config={[
			{
				labelContent: 'Покупки',
				content: '<Purchases />',
			},
			{
				labelContent: 'Баланс',
				content: '<Balance />',
			},
			{
				labelContent: 'Действия',
				content: '<EventActions />',
			},
		]}
	/>
));
