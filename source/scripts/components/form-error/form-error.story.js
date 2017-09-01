import React from 'react';
import { storiesOf } from '@storybook/react';
import FormError from './';

storiesOf('FormError', module)
	.add('default', () => (
		<FormError visible>Имена участников не должны повторяться</FormError>
	));
