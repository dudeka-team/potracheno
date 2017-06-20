import React from 'react';
import { storiesOf } from '@storybook/react';
import IconContentCopy from './content-copy';
import IconShoppingCart from './shopping-cart';

storiesOf('Icons', module)
	.add('ContentCopy', () => <IconContentCopy />)
	.add('ShoppingCart', () => <IconShoppingCart />);
