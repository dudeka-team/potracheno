import React from 'react';
import { storiesOf } from '@storybook/react';
import Poster from './';

storiesOf('Poster', module)
	.add('default', () => (
		<Poster icon="calendar">
			У вас пока нет мероприятий, создайте первым свое мероприятие и добавьте
			участников
		</Poster>
	))
	.add('icon purchase', () => (
		<Poster icon="purchase">Баланс появится, когда вы заведёте покупки</Poster>
	));
