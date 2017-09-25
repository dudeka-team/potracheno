import React from 'react';
import { storiesOf } from '@storybook/react';
import BalanceListItem from './';

storiesOf('BalanceListItem', module)
	.add('positive', () => (
		<BalanceListItem sum={2560} from="Андрей" to="Серёга" debtType="positive" />
	))
	.add('negative', () => (
		<BalanceListItem sum={2560} from="Андрей" to="Серёга" debtType="negative" />
	))
	.add('neutral', () => (
		<BalanceListItem sum={2560} from="Андрей" to="Серёга" debtType="neutral" />
	))
	.add('returned', () => (
		<BalanceListItem sum={2560} from="Андрей" to="Серёга" debtType="returned" />
	));
