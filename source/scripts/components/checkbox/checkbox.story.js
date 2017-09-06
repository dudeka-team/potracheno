import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './index';

storiesOf('Checkbox', module)
	.add('default', () => (
		<Checkbox />
	))
	.add('checked', () => (
		<Checkbox checked />
	))
	.add('disabled', () => (
		<Checkbox disabled />
	))
	.add('disabled checked', () => (
		<Checkbox disabled checked />
	));
