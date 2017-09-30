import React from 'react';
import { storiesOf } from '@storybook/react';
import EventHeader from './';

storiesOf('EventHeader', module)
	.add('default', () => (
		<EventHeader name="Пикник" subtitle="7 участников • 18 апреля" />
	))
	.add('user selection', () => (
		<EventHeader userSelection name="Пикник" subtitle="7 участников • 18 апреля" />
	));
