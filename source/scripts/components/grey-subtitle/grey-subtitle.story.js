import React from 'react';
import { storiesOf } from '@storybook/react';
import GreySubtitle from './';

storiesOf('GreySubtitle', module)
	.add('default', () => (
		<GreySubtitle>
			Ваш баланс
		</GreySubtitle>
	))
	.add('user selection', () => (
		<GreySubtitle userSelection>
			Ваш баланс
		</GreySubtitle>
	));
