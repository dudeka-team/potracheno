import React from 'react';
import { storiesOf } from '@storybook/react';
import FormLabel from './';

storiesOf('FormLabel', module)
	.add('default', () => (
		<FormLabel htmlFor="something">Электронная почта</FormLabel>
	));
