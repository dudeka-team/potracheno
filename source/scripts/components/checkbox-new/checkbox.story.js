import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './index';

storiesOf('Checkbox', module)
	.add('default', () => (
		<Checkbox id="checkbox-default" />
	))
	.add('with label', () => (
		<Checkbox id="checkbox-with-label">
			Check me
		</Checkbox>
	))
	.add('checked', () => (
		<Checkbox checked>
			Check me
		</Checkbox>
	))
	.add('disabled', () => (
		<Checkbox disabled>
			Check me
		</Checkbox>
	))
	.add('disabled checked', () => (
		<Checkbox disabled checked>
			Check me
		</Checkbox>
	));
