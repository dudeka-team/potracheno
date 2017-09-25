import React from 'react';
import { storiesOf } from '@storybook/react';
import ActionButton from './';

storiesOf('ActionButton', module)
	.add('default', () => (
		<ActionButton onClick={() => {}}>
			Добавить мероприятие
		</ActionButton>
	));
