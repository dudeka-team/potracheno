import React from 'react';
import { storiesOf } from '@storybook/react';
import FormInput from './form-input';

storiesOf('FormInput', module)
	.add('empty', () => (
		<FormInput
			type="number"
			placeholder="Сумма, ₽"
		/>
	))
	.add('with value', () => (
		<FormInput
			type="number"
			value={5000}
		/>
	))
	.add('disabled', () => (
		<FormInput
			disabled
			value="Hello, world!"
		/>
	))
	.add('invalid', () => (
		<FormInput
			invalid
			value="Hello, world!"
		/>
	))
	.add('large', () => (
		<FormInput
			size={FormInput.sizes.large}
			value="Hello, world!"
		/>
	));
