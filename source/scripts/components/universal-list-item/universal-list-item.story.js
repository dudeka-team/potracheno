import React from 'react';
import { storiesOf } from '@storybook/react';
import UniversalListItem from './';
import IconCross from '../icons/cross';
import IconCheck from '../icons/check';
import Checkbox from '../checkbox';

storiesOf('UniversalListItem', module)
	.add('default', () => (
		<UniversalListItem>
			Universal list item
		</UniversalListItem>
	))
	.add('with custom prefix (icon)', () => (
		<UniversalListItem prefix={<IconCross />}>
			Deletable
		</UniversalListItem>
	))
	.add('with custom prefix (checkbox)', () => (
		<UniversalListItem prefix={<Checkbox id="list-item-checkbox" />}>
			<label htmlFor="list-item-checkbox">Checkable</label>
		</UniversalListItem>
	))
	.add('with custom postfix (text)', () => (
		<UniversalListItem postfix="100 ₽">
			Колбаса
		</UniversalListItem>
	))
	.add('with custom postfix (icon)', () => (
		<UniversalListItem postfix={<IconCheck />}>
			Selected
		</UniversalListItem>
	))
	.add('isBordered', () => (
		<div>
			<UniversalListItem isBordered>First item</UniversalListItem>
			<UniversalListItem isBordered>Second item</UniversalListItem>
			<UniversalListItem isBordered>Third item</UniversalListItem>
		</div>
	));
